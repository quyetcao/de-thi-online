
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../services/authStorage'

const API_URL = import.meta.env.VITE_API_URL

// Lấy thông tin lượt thi theo attemptId
export const fetchExamAttemptDetail = createAsyncThunk(
  'examAttemptDetail/fetchDetail',

  async (attemptId, { rejectWithValue }) => {
    try {
      const token = getToken()

      if (!token) {
        return rejectWithValue('Bạn cần đăng nhập để tiếp tục')
      }

      const response = await fetch(
        `${API_URL}/api/exam-attempts/${attemptId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        return rejectWithValue(
          result.message || 'Không thể lấy thông tin lượt thi'
        )
      }

      return result.data

    } catch (error) {
      return rejectWithValue(
        error.message || 'Không thể kết nối máy chủ'
      )
    }
  }
)
