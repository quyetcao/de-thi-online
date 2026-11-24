
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../services/authStorage'

const API_URL = import.meta.env.VITE_API_URL

// Tạo headers có kèm JWT
const getAuthHeaders = () => {
  const token = getToken()

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// ==========================================
// 1. BẮT ĐẦU BÀI THI
// ==========================================
export const startExamAttempt = createAsyncThunk(
  'examAttempt/start',

  async (examId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/exam-attempts/start`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            examId: Number(examId),
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        return rejectWithValue(
          result.message || 'Không thể bắt đầu bài thi'
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

// ==========================================
// 2. NỘP BÀI THI
// ==========================================
export const submitExamAttempt = createAsyncThunk(
  'examAttempt/submit',

  async ({ attemptId, answers }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/exam-attempts/${attemptId}/submit`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            answers,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        return rejectWithValue(
          result.message || 'Không thể nộp bài thi'
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
