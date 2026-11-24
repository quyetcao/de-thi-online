
import { getToken } from './authStorage'

const API_URL = import.meta.env.VITE_API_URL

export async function getInfoAllExamByUserID() {
  const token = getToken()

  if (!token) {
    throw new Error('Bạn cần đăng nhập để xem lịch sử thi')
  }

  const response = await fetch(
    `${API_URL}/api/exam-attempts/my-history`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Không thể lấy lịch sử thi')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error('Backend trả về dữ liệu không thành công')
  }

  return result.data
}
