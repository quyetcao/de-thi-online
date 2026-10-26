const API_URL = 'http://localhost:3000'

export async function getAllLevels() {
  const response = await fetch(`${API_URL}/api/levels`)

  if (!response.ok) {
    throw new Error('Không thể lấy danh sách bậc học')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error('Backend trả về dữ liệu không thành công')
  }

  return result.data
}   

//////
export async function getLevelsBySectorId(sectorId) {
  const response = await fetch(`${API_URL}/api/levels/sector/${sectorId}`)

  if (!response.ok) {
    throw new Error('Không thể lấy danh sách bậc học')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error('Backend trả về dữ liệu không thành công')
  }

  return result.data
}   