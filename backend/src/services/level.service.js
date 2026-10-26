export default async function LevelService(fastify) {
  const getAllLevels = async () => {
    const levels = await fastify.levelRepository.getAllLevels()
    return levels
  }

  const getLevelsBySectorId = async (sectorId) => {
    const levels = await fastify.levelRepository.getLevelsBySectorId(sectorId)
    return levels
  }

  return {
    getAllLevels,
    getLevelsBySectorId,
  }
}