export default async function examAttemptService(fastify) {

  const startAttempt = async ({ userId, examId }) => {

    // 1. Kiểm tra đề thi
    const exam = await fastify.examRepository.getExamById(examId);

    if (!exam) {
      const error = new Error(
        'Không tìm thấy đề thi hoặc đề thi không hoạt động'
      );
      error.statusCode = 404;
      throw error;
    }

    // 2. Lấy danh sách câu hỏi
    const questions =
      await fastify.examRepository.getQuestionsByExamId(examId);

    if (!questions || questions.length === 0) {
      const error = new Error('Đề thi chưa có câu hỏi');
      error.statusCode = 400;
      throw error;
    }

    // 3. Kiểm tra thời lượng
    if (!exam.duration_minutes || exam.duration_minutes <= 0) {
      const error = new Error('Thời lượng đề thi không hợp lệ');
      error.statusCode = 400;
      throw error;
    }

    // 4. Tính tổng số câu hỏi
    const totalQuestions = questions.length;

    // 5. Tạo lần thi
    const attempt =
      await fastify.examAttemptRepository.createAttempt({
        userId,
        examId,
        totalQuestions,
        durationMinutes: exam.duration_minutes,
      });

    return {
      attempt,
      exam: {
        id: exam.id,
        title: exam.title,
        duration_minutes: exam.duration_minutes,
        total_questions: totalQuestions,
      },
    };
  };

  // Trả các hàm cho Plugin sử dụng
  return {
    startAttempt,
  };
}