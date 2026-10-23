import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllSectors } from '../../services/sectorApi'

export const fetchSectors = createAsyncThunk(
  'sectors/fetchSectors',
  async (_, { rejectWithValue }) => {
    try {
      const sectors = await getAllSectors()

      return sectors
    } catch (error) {
      return rejectWithValue(
        error.message || 'Không thể lấy danh sách ngành học'
      )
    }
  }
)