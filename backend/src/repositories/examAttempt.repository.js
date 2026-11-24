
export default async function examAttemptRepository(fastify) {

  // ==========================================
  // 1. TẠO LƯỢT THI
  // ==========================================
  const createAttempt = async ({
    userId,
    examId,
    totalQuestions,
    durationMinutes,
  }) => {

    // Bước 1: Chuyển các lượt thi đã hết giờ sang expired
    await fastify.db.query(
      `
      UPDATE exam_attempts
      SET
        status = 'expired',
        updated_at = NOW()
      WHERE user_id = $1
        AND exam_id = $2
        AND status = 'in_progress'
        AND expires_at <= NOW()
      `,
      [userId, examId]
    );

    // Bước 2: Kiểm tra người dùng có lượt thi đang hoạt động không
    const activeAttempt = await fastify.db.query(
      `
      SELECT id
      FROM exam_attempts
      WHERE user_id = $1
        AND exam_id = $2
        AND status = 'in_progress'
        AND expires_at > NOW()
      LIMIT 1
      `,
      [userId, examId]
    );

    if (activeAttempt.rows.length > 0) {
      const error = new Error(
        'Bạn đang có một lượt thi chưa hoàn thành'
      );
      error.statusCode = 409;
      throw error;
    }

    // Bước 3: Tạo lượt thi mới
    try {
      const result = await fastify.db.query(
        `
        INSERT INTO exam_attempts (
          user_id,
          exam_id,
          status,
          started_at,
          expires_at,
          total_questions
        )
        VALUES (
          $1,
          $2,
          'in_progress',
          NOW(),
          NOW() + ($4 * INTERVAL '1 minute'),
          $3
        )
        RETURNING *
        `,
        [userId, examId, totalQuestions, durationMinutes]
      );

      return result.rows[0];

    } catch (error) {

      // PostgreSQL: vi phạm UNIQUE
      // Có thể hai request cùng tạo lượt thi một lúc
      if (error.code === '23505') {
        const customError = new Error(
          'Bạn đang có một lượt thi chưa hoàn thành'
        );

        customError.statusCode = 409;
        throw customError;
      }

      throw error;
    }
  };


  // ==========================================
  // 2. LẤY THÔNG TIN LƯỢT THI
  // ==========================================
  const getAttemptById = async ({ attemptId, userId }) => {

    // Bước 1: Tự động cập nhật lượt thi đã hết giờ
    await fastify.db.query(
      `
      UPDATE exam_attempts
      SET
        status = 'expired',
        updated_at = NOW()
      WHERE id = $1
        AND user_id = $2
        AND status = 'in_progress'
        AND expires_at <= NOW()
      `,
      [attemptId, userId]
    );

    // Bước 2: Lấy thông tin lượt thi
    const result = await fastify.db.query(
      `
      SELECT
        ea.id,
        ea.user_id,
        ea.exam_id,
        ea.status,
        ea.started_at,
        ea.expires_at,
        ea.submitted_at,
        ea.total_questions,
        e.title AS exam_title,
        e.duration_minutes
      FROM exam_attempts ea
      JOIN exams e ON e.id = ea.exam_id
      WHERE ea.id = $1
        AND ea.user_id = $2
      `,
      [attemptId, userId]
    );

    return result.rows[0] || null;
  };


  // ==========================================
  // 3. NỘP BÀI VÀ CHẤM ĐIỂM
  // ==========================================
  const submitAttempt = async ({
    attemptId,
    userId,
    answers,
  }) => {

    // Lấy một kết nối riêng để thực hiện Transaction
    const client = await fastify.db.connect();

    let transactionStarted = false;

    try {

      // Bước 1: Bắt đầu Transaction
      await client.query('BEGIN');
      transactionStarted = true;


      // Bước 2: Lấy lượt thi và khóa dòng dữ liệu
      const attemptResult = await client.query(
        `
        SELECT
          *,
          (expires_at <= NOW()) AS is_expired
        FROM exam_attempts
        WHERE id = $1
          AND user_id = $2
        FOR UPDATE
        `,
        [attemptId, userId]
      );

      const attempt = attemptResult.rows[0];

      if (!attempt) {
        const error = new Error('Không tìm thấy lượt thi');
        error.statusCode = 404;
        throw error;
      }


      // Bước 3: Kiểm tra trạng thái lượt thi
      if (attempt.status !== 'in_progress') {
        const error = new Error(
          'Lượt thi đã được nộp hoặc kết thúc'
        );
        error.statusCode = 409;
        throw error;
      }


      // Bước 4: Kiểm tra thời gian hết hạn
      if (attempt.is_expired) {

        await client.query(
          `
          UPDATE exam_attempts
          SET
            status = 'expired',
            updated_at = NOW()
          WHERE id = $1
          `,
          [attemptId]
        );

        await client.query('COMMIT');
        transactionStarted = false;

        return {
          status: 'expired',
        };
      }


      // Bước 5: Kiểm tra câu hỏi và đáp án gửi lên
      const checkResult = await client.query(
        `
        WITH submitted AS (
          SELECT
            question_id,
            answer_id
          FROM jsonb_to_recordset($2::jsonb)
          AS item(
            question_id BIGINT,
            answer_id BIGINT
          )
        ),

        valid_answers AS (
          SELECT
            s.question_id,
            s.answer_id,
            a.is_correct
          FROM submitted s

          JOIN questions q
            ON q.id = s.question_id
           AND q.exam_id = $1

          JOIN answers a
            ON a.id = s.answer_id
           AND a.question_id = q.id
        )

        SELECT
          (SELECT COUNT(*) FROM submitted)::INTEGER
            AS submitted_count,

          COUNT(*)::INTEGER
            AS valid_count,

          COUNT(*) FILTER (
            WHERE is_correct = TRUE
          )::INTEGER
            AS correct_count

        FROM valid_answers
        `,
        [
          attempt.exam_id,
          JSON.stringify(answers),
        ]
      );


      const {
        submitted_count,
        valid_count,
        correct_count,
      } = checkResult.rows[0];


      // Bước 6: Từ chối nếu có câu trả lời không hợp lệ
      if (Number(submitted_count) !== Number(valid_count)) {
        const error = new Error(
          'Có câu trả lời không hợp lệ'
        );
        error.statusCode = 400;
        throw error;
      }


      // Bước 7: Lưu đáp án người dùng đã chọn
      await client.query(
        `
        INSERT INTO attempt_answers (
          attempt_id,
          question_id,
          answer_id
        )
        SELECT
          $1,
          item.question_id,
          item.answer_id
        FROM jsonb_to_recordset($2::jsonb)
        AS item(
          question_id BIGINT,
          answer_id BIGINT
        )
        `,
        [
          attemptId,
          JSON.stringify(answers),
        ]
      );


      // Bước 8: Tính điểm theo thang điểm 10
      const totalQuestions = Number(attempt.total_questions);
      const correctAnswers = Number(correct_count);

      const score =
        totalQuestions > 0
          ? Number(
              ((correctAnswers / totalQuestions) * 10).toFixed(2)
            )
          : 0;


      // Bước 9: Cập nhật kết quả lượt thi
      const updateResult = await client.query(
        `
        UPDATE exam_attempts
        SET
          status = 'submitted',
          submitted_at = NOW(),
          correct_answers = $2,
          score = $3,
          updated_at = NOW()
        WHERE id = $1
        RETURNING *
        `,
        [
          attemptId,
          correctAnswers,
          score,
        ]
      );


      // Bước 10: Xác nhận lưu toàn bộ dữ liệu
      await client.query('COMMIT');
      transactionStarted = false;


      return {
        status: 'submitted',
        attempt: updateResult.rows[0],
      };

    } catch (error) {

      // Nếu Transaction đã bắt đầu mà gặp lỗi
      // thì hủy toàn bộ thay đổi
      if (transactionStarted) {
        await client.query('ROLLBACK');
      }

      throw error;

    } finally {

      // Luôn giải phóng kết nối
      client.release();
    }
  };

  // ==========================================
  // 4.Lấy thông tin các bài thi mà user đã làm
  // ==========================================

const getExamAttemptByUserId = async (userId) => {
    const result = await fastify.db.query(
      `
        SELECT
          et.id,
          et.user_id,
          et.exam_id,
          et.status,
          et.score,
          a.title,
          et.submitted_at
        FROM exam_attempts et
        LEFT JOIN exams a
          ON et.exam_id = a.id
         WHERE et.user_id = $1
      `,
      [userId]
    )

    return result.rows
  }


  // ==========================================
  // 5. CÁC HÀM CUNG CẤP CHO SERVICE
  // ==========================================
  return {
    createAttempt,
    getAttemptById,
    submitAttempt,
    getExamAttemptByUserId,
  };
}
