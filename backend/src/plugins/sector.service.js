import fp from 'fastify-plugin'
import sectorService from '../services/sector.service.js'

export default fp(async (fastify) => {
  const service = await sectorService(fastify)

  fastify.decorate('sectorService', service)
})