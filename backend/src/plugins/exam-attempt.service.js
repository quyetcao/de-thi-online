import fp from 'fastify-plugin'
import examAttemptService from '../services/examAttempt.service.js'

export default fp(
  async (fastify) => {

    // Khởi tạo Service
    const service = await examAttemptService(fastify)

    // Đăng ký Service vào Fastify
    fastify.decorate('examAttemptService', service)

  },
  {
    name: 'exam-attempt-service',
    dependencies: [
      'exam-repository',
      'exam-attempt-repository',
    ],
  }
)