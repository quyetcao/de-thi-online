import { createSlice } from '@reduxjs/toolkit'
import { fetchExamHistory } from './userThunk'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const userAttemptHistorySlice = createSlice({
  name: 'userinfoattempt',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Khi bắt đầu gọi API
      .addCase(fetchExamHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // Khi gọi API thành công
      .addCase(fetchExamHistory.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })

      // Khi gọi API thất bại
      .addCase(fetchExamHistory.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || 'Không thể thông tin người dùng'
      })
  },
})

export default userAttemptHistorySlice.reducer