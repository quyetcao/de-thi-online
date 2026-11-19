
export default async function examAttemptRepository(fastify) {

  const createAttempt = async ({
    userId,
    examId,
    totalQuestions,
    durationMinutes
  }) => {

    // Bước 1: Chuyển lần thi đã hết hạn thành expired
    await fastify.db.query(
      `UPDATE exam_attempts
       SET
         status = 'expired',
         updated_at = NOW()
       WHERE user_id = $1
         AND exam_id = $2
         AND status = 'in_progress'
         AND expires_at <= NOW()`,
      [userId, examId]
    );

    // Bước 2: Tạo lần thi mới
    const result = await fastify.db.query(
      `INSERT INTO exam_attempts (
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
      RETURNING *`,
      [userId, examId, totalQuestions, durationMinutes]
    );

    return result.rows[0];
  };

  return {
    createAttempt
  };
}
