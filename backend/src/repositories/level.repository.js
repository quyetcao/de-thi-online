// export default async function levelRepository(fastify) {
//   const getLevelsBySectorId = async (sectorId) => {(
//     // Viết câu SQL lấy bậc học theo sectorId ở đây
//  'SELECT
//         l.id,
//         l.sector_id,
//         l.name,
//         l.slug,
//         l.description,
//       FROM levels l
//       WHERE l.sector_id = $1
//       ')
//     return result.rows
//     // Trả về danh sách bậc học
//   }

//   return {
//     getLevelsBySectorId,
//   }
// }