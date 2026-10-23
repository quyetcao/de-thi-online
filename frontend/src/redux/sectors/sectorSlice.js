import { createSlice } from '@reduxjs/toolkit'
import { fetchSectors } from './sectorThunk'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const sectorSlice = createSlice({
  name: 'sectors',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Khi bắt đầu gọi API
      .addCase(fetchSectors.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // Khi gọi API thành công
      .addCase(fetchSectors.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })

      // Khi gọi API thất bại
      .addCase(fetchSectors.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || 'Không thể lấy danh sách ngành học'
      })
  },
})

export default sectorSlice.reducer