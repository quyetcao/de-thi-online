
export default async function examAttemptRoutes(fastify) {

  // API bắt đầu bài thi
  fastify.post(
    '/api/exam-attempts/start',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const { examId } = request.body || {};

        if (!Number.isInteger(Number(examId)) || Number(examId) <= 0) {
          return reply.code(400).send({
            success: false,
            message: 'ID đề thi không hợp lệ',
          });
        }

        // Lấy ID người dùng từ JWT
        const userId = Number(request.user.id);

        const result = await fastify.examAttemptService.startAttempt({
          userId,
          examId: Number(examId),
        });

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
    }
  );


  // API lấy thông tin lượt thi
  fastify.get(
    '/api/exam-attempts/:attemptId',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const attemptId = Number(request.params.attemptId);

        if (!Number.isInteger(attemptId) || attemptId <= 0) {
          return reply.code(400).send({
            success: false,
            message: 'ID lượt thi không hợp lệ',
          });
        }

        // Lấy ID người dùng từ JWT
        const userId = Number(request.user.id);

        const result = await fastify.examAttemptService.getAttemptById({
          attemptId,
          userId,
        });

        return reply.send({
          success: true,
          message: 'Lấy thông tin lượt thi thành công',
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


  // API nộp bài thi
  fastify.post(
    '/api/exam-attempts/:attemptId/submit',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const attemptId = Number(request.params.attemptId);

        if (!Number.isInteger(attemptId) || attemptId <= 0) {
          return reply.code(400).send({
            success: false,
            message: 'ID lượt thi không hợp lệ',
          });
        }

        const { answers } = request.body || {};

        // Lấy ID người dùng từ JWT
        const userId = Number(request.user.id);

        const result = await fastify.examAttemptService.submitAttempt({
          attemptId,
          userId,
          answers,
        });

        if (result.status === 'expired') {
          return reply.code(409).send({
            success: false,
            message: 'Đã hết thời gian làm bài',
            data: result,
          });
        }

        return reply.code(200).send({
          success: true,
          message: 'Nộp bài thành công',
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

  //Api lấy thông tin user đã làm bài thi để thống kê theo ID
  
fastify.get(
  '/api/exam-attempts/my-history',
  {
    preHandler: fastify.authenticate,
  },
  async (request, reply) => {
    try {
      // Lấy ID người dùng từ JWT
      const userId = Number(request.user.id);

      if (!Number.isInteger(userId) || userId <= 0) {
        return reply.code(401).send({
          success: false,
          message: 'Thông tin người dùng không hợp lệ',
        });
      }

      // Gọi Service lấy lịch sử thi
      const result =
        await fastify.examAttemptService.getExamAttemptByUserIdService(userId);

      return reply.send({
        success: true,
        message: 'Lấy lịch sử thi thành công',
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
