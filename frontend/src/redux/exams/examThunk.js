import { createAsyncThunk } from '@reduxjs/toolkit'
import { getExamsByLevelId } from '../../services/examApi'

export const fetchExams = createAsyncThunk(
  'levels/fetchLevels',
  async (levelId, { rejectWithValue }) => {
    try {
      const exams = await getExamsByLevelId(levelId)

      return exams
    } catch (error) {
      return rejectWithValue(
        error.message || 'Không thể lấy danh sách bậc học'
      )
    }
  }
)
