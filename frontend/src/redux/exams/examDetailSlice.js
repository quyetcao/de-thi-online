import { createSlice } from '@reduxjs/toolkit'
import { fetchExamDetail } from './examDetailThunk'

const examDetailSlice = createSlice({
  name: 'examDetail',

  initialState: {
    item: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearExamDetail: (state) => {
      state.item = null
      state.loading = false
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchExamDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchExamDetail.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
      })

      .addCase(fetchExamDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearExamDetail } = examDetailSlice.actions

export default examDetailSlice.reducer