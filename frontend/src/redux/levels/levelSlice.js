import { createSlice } from '@reduxjs/toolkit'
import { fetchLevels } from './levelThunk'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const levelSlice = createSlice({
  name: 'levels',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Khi bắt đầu gọi API
      .addCase(fetchLevels.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // Khi gọi API thành công
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })

      // Khi gọi API thất bại
      .addCase(fetchLevels.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || 'Không thể lấy danh sách bậc học'
      })
  },
})

export default levelSlice.reducer