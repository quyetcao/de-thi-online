const API_URL = 'http://localhost:3000'

export async function getAllSectors() {
  const response = await fetch(`${API_URL}/api/sectors`)

  if (!response.ok) {
    throw new Error('Không thể lấy danh sách ngành học')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error('Backend trả về dữ liệu không thành công')
  }

  return result.data
}