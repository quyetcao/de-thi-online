
import { createSlice } from "@reduxjs/toolkit";
import { fetchExamAttemptDetail } from "./examAttemptDetailThunk";

const initialState = {
  attempt: null,
  loading: false,
  error: null,
};

const examAttemptDetailSlice = createSlice({
  name: "examAttemptDetail",

  initialState,

  reducers: {
    clearExamAttemptDetail: (state) => {
      state.attempt = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Khi bắt đầu gọi API
      .addCase(fetchExamAttemptDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Khi API thành công
      .addCase(fetchExamAttemptDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.attempt = action.payload;
      })

      // Khi API thất bại
      .addCase(fetchExamAttemptDetail.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Không thể lấy thông tin lượt thi";
      });
  },
});

export const { clearExamAttemptDetail } =
  examAttemptDetailSlice.actions;

export default examAttemptDetailSlice.reducer;
