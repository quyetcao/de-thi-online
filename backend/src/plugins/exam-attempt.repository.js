
import fp from 'fastify-plugin'
import examAttemptRepository from '../repositories/examAttempt.repository.js'

export default fp(
  async (fastify) => {
    const repository = await examAttemptRepository(fastify)

    fastify.decorate('examAttemptRepository', repository)
  },
  {
    name: 'exam-attempt-repository',
    dependencies: ['db'],
  }
)
