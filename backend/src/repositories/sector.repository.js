export default async function sectorRepository(fastify) {
  const getAllSectors = async () => {
    const result = await fastify.db.query(`
      SELECT
        id,
        name,
        sort_order
      FROM sectors
      ORDER BY sort_order ASC, id ASC
    `)

    return result.rows
  }

  return {
    getAllSectors,
  }
}