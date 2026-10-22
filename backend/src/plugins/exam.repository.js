import fp from 'fastify-plugin'
import examRepository from '../repositories/exam.repository.js'

export default fp(async (fastify) => {
  const repository = await examRepository(fastify)

  fastify.decorate('examRepository', repository)
})