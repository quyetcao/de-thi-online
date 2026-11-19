export default async function attemptAnswerRepository(fastify) {

  // 1. Lấy thông tin lần thi của người dùng
  const getAttemptForUser = async ({ attemptId, userId }) => {
    const result = await fastify.db.query(
      `
      SELECT
        id,
        user_id,
        exam_id,
        status,
        expires_at
      FROM exam_attempts
      WHERE id = $1 AND user_id = $2
      `,
      [attemptId, userId]
    );

    return result.rows[0] || null;
  };

  // 2. Kiểm tra câu hỏi và đáp án có thuộc đúng đề thi không
  const isValidAnswer = async ({
    examId,
    questionId,
    answerId,
  }) => {
    const result = await fastify.db.query(
      `
      SELECT q.id
      FROM questions q
      INNER JOIN answers a
        ON a.question_id = q.id
      WHERE q.id = $1
        AND q.exam_id = $2
        AND a.id = $3
      `,
      [questionId, examId, answerId]
    );

    return result.rowCount > 0;
  };

  // 3. Lưu hoặc cập nhật đáp án
  const saveAnswer = async ({
    attemptId,
    questionId,
    answerId,
  }) => {
    const result = await fastify.db.query(
      `
      INSERT INTO attempt_answers (
        attempt_id,
        question_id,
        answer_id,
        answered_at,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, NOW(), NOW(), NOW())

      ON CONFLICT (attempt_id, question_id)
      DO UPDATE SET
        answer_id = EXCLUDED.answer_id,
        answered_at = NOW(),
        updated_at = NOW()

      RETURNING *
      `,
      [attemptId, questionId, answerId]
    );

    return result.rows[0];
  };

  return {
    getAttemptForUser,
    isValidAnswer,
    saveAnswer,
  };
}