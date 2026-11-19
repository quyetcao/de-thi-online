export default async function attemptAnswerRoutes(fastify) {

  // API lưu câu trả lời
  fastify.post(
    '/api/exam-attempts/:attemptId/answers',
    async (request, reply) => {

      try {
        // 1. Lấy dữ liệu từ URL
        const attemptId = Number(request.params.attemptId);

        // 2. Lấy dữ liệu từ Body
        const { questionId, answerId } = request.body || {};

        // 3. Kiểm tra dữ liệu
        if (
          !Number.isInteger(attemptId) || attemptId <= 0 ||
          !Number.isInteger(Number(questionId)) || Number(questionId) <= 0 ||
          !Number.isInteger(Number(answerId)) || Number(answerId) <= 0
        ) {
          return reply.code(400).send({
            success: false,
            message: 'Dữ liệu câu trả lời không hợp lệ',
          });
        }

        // 4. Tạm thời dùng userId = 1 để kiểm thử
        // Sau này thay bằng request.user.id từ JWT
        const userId = 1;

        // 5. Gọi Service
        const result =
          await fastify.attemptAnswerService.saveAnswer({
            attemptId,
            userId,
            questionId: Number(questionId),
            answerId: Number(answerId),
          });

        // 6. Trả kết quả
        return reply.code(200).send({
          success: true,
          message: 'Lưu câu trả lời thành công',
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
    }
  );
}