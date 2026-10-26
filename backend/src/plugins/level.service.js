import fp from 'fastify-plugin'
import LevelService from '../services/level.service.js'

export default fp(async (fastify) => {
  const service = await LevelService(fastify)

  fastify.decorate('levelService', service)
})