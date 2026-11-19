export default async function attemptAnswerService(fastify) {

  const saveAnswer = async ({
    attemptId,
    userId,
    questionId,
    answerId,
  }) => {

    // 1. Kiểm tra lần thi
    const attempt =
      await fastify.attemptAnswerRepository.getAttemptForUser({
        attemptId,
        userId,
      });

    if (!attempt) {
      const error = new Error('Không tìm thấy lần thi');
      error.statusCode = 404;
      throw error;
    }

    // 2. Kiểm tra trạng thái lần thi
    if (attempt.status !== 'in_progress') {
      const error = new Error('Lần thi đã kết thúc');
      error.statusCode = 400;
      throw error;
    }

    // 3. Kiểm tra thời gian làm bài
    if (new Date(attempt.expires_at).getTime() <= Date.now()) {
      const error = new Error('Đã hết thời gian làm bài');
      error.statusCode = 400;
      throw error;
    }

    // 4. Kiểm tra câu hỏi và đáp án
    const validAnswer =
      await fastify.attemptAnswerRepository.isValidAnswer({
        examId: attempt.exam_id,
        questionId,
        answerId,
      });

    if (!validAnswer) {
      const error = new Error(
        'Câu hỏi hoặc đáp án không hợp lệ'
      );
      error.statusCode = 400;
      throw error;
    }

    // 5. Lưu đáp án
    const answer =
      await fastify.attemptAnswerRepository.saveAnswer({
        attemptId,
        questionId,
        answerId,
      });

    return answer;
  };

  return {
    saveAnswer,
  };
}