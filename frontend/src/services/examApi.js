const API_URL = import.meta.env.VITE_API_URL

export async function getExamsByLevelId(levelId) {
  const response = await fetch(`${API_URL}/api/exams/level/${levelId}`)

  if (!response.ok) {
    throw new Error('Không thể lấy danh sách đề thi theo bậc học ')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error('Backend trả về dữ liệu không thành công')
  }

  return result.data
}   