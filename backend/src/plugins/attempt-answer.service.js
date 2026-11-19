import fp from 'fastify-plugin'
import attemptAnswerService from '../services/attemptAnswer.service.js'

export default fp(
  async (fastify) => {

    const service = await attemptAnswerService(fastify)

    fastify.decorate('attemptAnswerService', service)

  },
  {
    name: 'attempt-answer-service',
    dependencies: [
      'attempt-answer-repository',
    ],
  }
)