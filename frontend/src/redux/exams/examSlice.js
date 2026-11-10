import { createSlice } from '@reduxjs/toolkit'
import { fetchExams } from './examThunk'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Khi bắt đầu gọi API
      .addCase(fetchExams.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // Khi gọi API thành công
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })

      // Khi gọi API thất bại
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || 'Không thể lấy danh sách đề thi'
      })
  },
})

export default examSlice.reducer