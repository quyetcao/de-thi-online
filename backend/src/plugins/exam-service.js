import fp from 'fastify-plugin'
import examService from '../services/exam.service.js'

export default fp(async (fastify) => {
  const service = await examService(fastify)

  fastify.decorate('examService', service)
})