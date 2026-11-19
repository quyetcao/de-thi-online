import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchExamQuestions = createAsyncThunk(
  'examQuestion/fetchExamQuestions',
  async (id, { rejectWithValue }) => {
      console.log("alo", id)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exams/${id}/questions`
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        return rejectWithValue(
          result.message || 'Không lấy được danh sách câu hỏi'
        )
      }

      return result.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)