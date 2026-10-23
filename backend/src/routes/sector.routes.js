export default async function sectorRoutes(fastify) {
  fastify.get('/api/sectors', async (request, reply) => {
    const sectors = await fastify.sectorService.getAllSectors()

    return reply.send({
      success: true,
      data: sectors,
    })
  })
}