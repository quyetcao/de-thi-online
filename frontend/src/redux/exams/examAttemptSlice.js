
import { createSlice } from '@reduxjs/toolkit'
import {
  startExamAttempt,
  submitExamAttempt,
} from './examAttemptThunk'

const initialState = {
  // Thông tin lượt thi
  attempt: null,
  exam: null,

  // Trạng thái bắt đầu lượt thi
  loading: false,
  error: null,

  // Trạng thái nộp bài
  submitLoading: false,
  submitError: null,
  submitResult: null,
}

const examAttemptSlice = createSlice({
  name: 'examAttempt',

  initialState,

  reducers: {
    clearExamAttempt: (state) => {
      state.attempt = null
      state.exam = null

      state.loading = false
      state.error = null

      state.submitLoading = false
      state.submitError = null
      state.submitResult = null
    },
  },

  extraReducers: (builder) => {
    builder
      // =================================
      // 1. BẮT ĐẦU LƯỢT THI
      // =================================

      .addCase(startExamAttempt.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(startExamAttempt.fulfilled, (state, action) => {
        state.loading = false
        state.attempt = action.payload.attempt
        state.exam = action.payload.exam
      })

      .addCase(startExamAttempt.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Không thể bắt đầu bài thi'
      })

      // =================================
      // 2. NỘP BÀI THI
      // =================================

      .addCase(submitExamAttempt.pending, (state) => {
        state.submitLoading = true
        state.submitError = null
      })

      .addCase(submitExamAttempt.fulfilled, (state, action) => {
        state.submitLoading = false
        state.submitResult = action.payload
      })

      .addCase(submitExamAttempt.rejected, (state, action) => {
        state.submitLoading = false
        state.submitError =
          action.payload || 'Không thể nộp bài thi'
      })
  },
})

export const { clearExamAttempt } = examAttemptSlice.actions

export default examAttemptSlice.reducer
