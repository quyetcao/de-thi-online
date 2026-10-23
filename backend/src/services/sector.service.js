export default async function sectorService(fastify) {
  const getAllSectors = async () => {
    const sectors = await fastify.sectorRepository.getAllSectors()

    return sectors
  }

  return {
    getAllSectors,
  }
}