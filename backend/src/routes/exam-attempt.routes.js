export default async function examAttemptRoutes(fastify) {

  // API bắt đầu bài thi
  fastify.post('/api/exam-attempts/start', async (request, reply) => {

    try {
      // 1. Nhận examId từ Frontend
      const { examId } = request.body || {};

      // 2. Kiểm tra examId
      if (!Number.isInteger(Number(examId)) || Number(examId) <= 0) {
        return reply.code(400).send({
          success: false,
          message: 'ID đề thi không hợp lệ',
        });
      }

      // 3. Tạm thời dùng userId = 1 để kiểm thử
      // Sau này sẽ lấy từ JWT: request.user.id
      const userId = 1;

      // 4. Gọi Service xử lý nghiệp vụ
      const result = await fastify.examAttemptService.startAttempt({
        userId,
        examId: Number(examId),
      });

      // 5. Trả kết quả về Frontend
      return reply.code(201).send({
        success: true,
        message: 'Bắt đầu bài thi thành công',
        data: result,
      });

    } catch (error) {
      fastify.log.error(error);

      return reply.code(error.statusCode || 500).send({
        success: false,
        message: error.statusCode
          ? error.message
          : 'Đã xảy ra lỗi máy chủ',
      });
    }
  });
}