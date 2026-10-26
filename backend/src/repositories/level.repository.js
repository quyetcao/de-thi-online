
export default async function levelRepository(fastify) {
  // Hàm 1: Lấy tất cả bậc học
  const getAllLevels = async () => {
    const result = await fastify.db.query(`
      SELECT
        id,
        name,
        sector_id,
        slug,
        description,
        sort_order
      FROM levels
      ORDER BY sector_id ASC, sort_order ASC, id ASC
    `)

    return result.rows
  }

  // Hàm 2: Lấy bậc học theo ID ngành
  const getLevelsBySectorId = async (sectorId) => {
    const result = await fastify.db.query(
      `
        SELECT
          id,
          name,
          sector_id,
          slug,
          description,
          sort_order
        FROM levels
        WHERE sector_id = $1
        ORDER BY sort_order ASC, id ASC
      `,
      [sectorId]
    )

    return result.rows
  }

  // Công khai hai hàm để Service sử dụng
  return {
    getAllLevels,
    getLevelsBySectorId,
  }
}
