import fp from 'fastify-plugin'
import attemptAnswerRepository from '../repositories/attemptAnswer.repository.js'

export default fp(
  async (fastify) => {

    // Khởi tạo Repository
    const repository = await attemptAnswerRepository(fastify)

    // Đăng ký Repository vào Fastify
    fastify.decorate('attemptAnswerRepository', repository)

  },
  {
    name: 'attempt-answer-repository',
    dependencies: ['db'],
  }
)