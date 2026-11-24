import { createAsyncThunk } from '@reduxjs/toolkit'
import { getInfoAllExamByUserID } from '../../services/userApi'

export const fetchExamHistory = createAsyncThunk(
  'users/fetchExamHistory',
  async (_, { rejectWithValue }) => {
    try {
      const examHistory = await getInfoAllExamByUserID()

      return examHistory
    } catch (error) {
      return rejectWithValue(
        error.message || 'Không thể lấy lịch sử thi'
      )
    }
  }
)
