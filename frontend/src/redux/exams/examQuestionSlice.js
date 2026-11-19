import { createSlice } from '@reduxjs/toolkit'
import { fetchExamQuestions } from './examQuestionThunk'

const examQuestionSlice = createSlice({
  name: 'examQuestion',

  initialState: {
    exam: null,
    questions: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearExamQuestions: (state) => {
      state.exam = null
      state.questions = []
      state.loading = false
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      // Khi bắt đầu gọi API
      .addCase(fetchExamQuestions.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // Khi lấy dữ liệu thành công
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        state.loading = false
        state.exam = action.payload.exam
        state.questions = action.payload.questions
      })

      // Khi lấy dữ liệu thất bại
      .addCase(fetchExamQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearExamQuestions } = examQuestionSlice.actions

export default examQuestionSlice.reducer