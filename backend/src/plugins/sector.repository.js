import fp from 'fastify-plugin'
import sectorRepository from '../repositories/sector.repository.js'

export default fp(async (fastify) => {
  const repository = await sectorRepository(fastify)

  fastify.decorate('sectorRepository', repository)
})