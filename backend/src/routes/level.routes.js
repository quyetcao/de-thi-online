
export default async function LevelsRoutes(fastify) {
  // API 1: Lấy tất cả bậc học
  fastify.get('/api/levels', async (request, reply) => {
    const levels = await fastify.levelService.getAllLevels()

    return reply.send({
      success: true,
      data: levels,
    })
  })

  // API 2: Lấy danh sách bậc học theo ID ngành
  fastify.get('/api/levels/sector/:sectorId', async (request, reply) => {
    const sectorId = Number(request.params.sectorId)

    // Bước 1: Kiểm tra ID ngành
    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return reply.code(400).send({
        success: false,
        message: 'ID ngành học không hợp lệ',
      })
    }

    // Bước 2: Lấy danh sách bậc học thuộc ngành
    const levels =
      await fastify.levelService.getLevelsBySectorId(sectorId)

    // Bước 3: Trả về danh sách
    return reply.send({
      success: true,
      data: levels,
    })
  })
}
