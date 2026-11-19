import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchExamDetail = createAsyncThunk(
  'exams/fetchExamDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exams/${id}`
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        return rejectWithValue(
          result.message || 'Không lấy được thông tin đề thi'
        )
      }

      return result.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)