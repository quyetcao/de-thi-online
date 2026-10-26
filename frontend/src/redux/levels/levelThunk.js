import { createAsyncThunk } from '@reduxjs/toolkit'
import { getLevelsBySectorId } from '../../services/levelApi'

export const fetchLevels = createAsyncThunk(
  'levels/fetchLevels',
  async (sectorId, { rejectWithValue }) => {
    try {
      const levels = await getLevelsBySectorId(sectorId)

      return levels
    } catch (error) {
      return rejectWithValue(
        error.message || 'Không thể lấy danh sách bậc học'
      )
    }
  }
)
