import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Paper } from "@mui/material";

import { fetchExamDetail } from "../../../redux/exams/examDetailThunk";
import { clearExamDetail } from "../../../redux/exams/examDetailSlice";
import { startExamAttempt } from "../../../redux/exams/examAttemptThunk";

export default function ExamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    item: exam,
    loading,
    error,
  } = useSelector((state) => state.examDetail);

    const { loading: starting, error: startError } = useSelector(
    (state) => state.examAttempt,
  );

  useEffect(() => {
    dispatch(fetchExamDetail(id));

    return () => {
      dispatch(clearExamDetail());
    };
  }, [dispatch, id]);

  if (loading) return <p>Đang tải...</p>;

  if (error) return <p>Lỗi: {error}</p>;

  if (!exam) return <p>Không tìm thấy đề thi.</p>;

  /////////////
  const handleStartExam = async () => {
    try {
      const result = await dispatch(startExamAttempt(exam.id)).unwrap();

      navigate(`/lam-bai/${result.attempt.id}`);
    } catch (error) {
      console.error("Lỗi bắt đầu bài thi:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          {exam.title}
        </Typography>

        <Typography sx={{ mt: 3 }}>
          Thời gian: {exam.duration_minutes} phút
        </Typography>

        <Typography>Điểm đạt: {exam.passing_score} điểm</Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 4 }}
          onClick={handleStartExam}
          disabled={starting}
        >
          {starting ? "Đang tạo lượt thi..." : "Bắt đầu làm bài"}
        </Button>

        {startError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {startError}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
