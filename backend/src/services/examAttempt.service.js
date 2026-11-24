
export default async function examAttemptService(fastify) {

  // BẮT ĐẦU BÀI THI
  const startAttempt = async ({ userId, examId }) => {

    const exam = await fastify.examRepository.getExamById(examId);

    if (!exam) {
      const error = new Error(
        'Không tìm thấy đề thi hoặc đề thi không hoạt động'
      );
      error.statusCode = 404;
      throw error;
    }

    const questions =
      await fastify.examRepository.getQuestionsByExamId(examId);

    if (!questions || questions.length === 0) {
      const error = new Error('Đề thi chưa có câu hỏi');
      error.statusCode = 400;
      throw error;
    }

    if (!exam.duration_minutes || exam.duration_minutes <= 0) {
      const error = new Error('Thời lượng đề thi không hợp lệ');
      error.statusCode = 400;
      throw error;
    }

    const totalQuestions = questions.length;

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


  // LẤY THÔNG TIN LƯỢT THI
  const getAttemptById = async ({ attemptId, userId }) => {

    const attempt =
      await fastify.examAttemptRepository.getAttemptById({
        attemptId,
        userId,
      });

    if (!attempt) {
      const error = new Error('Không tìm thấy lượt thi');
      error.statusCode = 404;
      throw error;
    }

    return attempt;
  };


  // NỘP BÀI THI
  const submitAttempt = async ({ attemptId, userId, answers }) => {

    // 1. Kiểm tra answers có phải mảng không
    if (!Array.isArray(answers)) {
      const error = new Error(
        'Danh sách câu trả lời không hợp lệ'
      );
      error.statusCode = 400;
      throw error;
    }

    // 2. Tạo Set để kiểm tra câu hỏi bị gửi trùng
    const answeredQuestionIds = new Set();

    // 3. Chuẩn hóa danh sách câu trả lời
    const normalizedAnswers = [];

    for (const item of answers) {

      // Kiểm tra cấu trúc dữ liệu
      if (
        !item ||
        typeof item !== 'object' ||
        Array.isArray(item)
      ) {
        const error = new Error(
          'Dữ liệu câu trả lời không hợp lệ'
        );
        error.statusCode = 400;
        throw error;
      }

      const questionId = String(item.question_id ?? '');
      const answerId = String(item.answer_id ?? '');

      // Kiểm tra ID là số nguyên dương
      if (
        !/^[1-9]\d*$/.test(questionId) ||
        !/^[1-9]\d*$/.test(answerId)
      ) {
        const error = new Error(
          'ID câu hỏi hoặc đáp án không hợp lệ'
        );
        error.statusCode = 400;
        throw error;
      }

      // Chuẩn hóa ID
      const normalizedQuestionId =
        BigInt(questionId).toString();

      const normalizedAnswerId =
        BigInt(answerId).toString();

      // Kiểm tra câu hỏi bị gửi trùng
      if (answeredQuestionIds.has(normalizedQuestionId)) {
        const error = new Error(
          'Không được trả lời một câu hỏi nhiều lần'
        );
        error.statusCode = 400;
        throw error;
      }

      answeredQuestionIds.add(normalizedQuestionId);

      normalizedAnswers.push({
        question_id: normalizedQuestionId,
        answer_id: normalizedAnswerId,
      });
    }

    // 4. Gọi Repository lưu bài và chấm điểm
    const result =
      await fastify.examAttemptRepository.submitAttempt({
        attemptId,
        userId,
        answers: normalizedAnswers,
      });

    return result;
  };


  //5. Lấy danh sách bài thi đã làm và điểm theo userId 
    const getExamAttemptByUserIdService = async (id) => {
  const examattempt = await fastify.examAttemptRepository.getExamAttemptByUserId(id)
  return examattempt
    };

  // CÁC HÀM ĐƯỢC CUNG CẤP CHO FASTIFY
  return {
    startAttempt,
    getAttemptById,
    submitAttempt,
    getExamAttemptByUserIdService,
  };
}
