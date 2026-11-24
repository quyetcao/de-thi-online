
import {
  Box,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";

// API lấy câu hỏi
import { fetchExamQuestions } from "../../../redux/exams/examQuestionThunk";

// API lấy thông tin lượt thi
import { fetchExamAttemptDetail } from "../../../redux/exams/examAttemptDetailThunk";

// Xóa thông tin lượt thi trong Redux
import { clearExamAttemptDetail } from "../../../redux/exams/examAttemptDetailSlice";

// API nộp bài
import { submitExamAttempt } from "../../../redux/exams/examAttemptThunk";

export default function ExamTaking() {
  // =========================================
  // 1. QUẢN LÝ TRẠNG THÁI GIAO DIỆN
  // =========================================

  // Câu hỏi hiện tại đang xem
  const [currentIndex, setCurrentIndex] = useState(0);

  // Danh sách câu trả lời của người dùng
  const [userAnswers, setUserAnswers] = useState([]);

  // Thời gian còn lại
  const [remainingSeconds, setRemainingSeconds] = useState(null);

  // =========================================
  // 2. LẤY THÔNG TIN TỪ URL VÀ REDUX
  // =========================================

  const { attemptId } = useParams();

  const dispatch = useDispatch();

  // Thông tin lượt thi
  const {
    attempt,
    loading: attemptLoading,
    error: attemptError,
  } = useSelector((state) => state.examAttemptDetail);

  // Danh sách câu hỏi
  const {
    questions,
    loading,
    error,
  } = useSelector((state) => state.examQuestion);

  // Trạng thái nộp bài
  const {
    submitLoading,
    submitError,
    submitResult,
  } = useSelector((state) => state.examAttempt);

  // =========================================
  // 3. QUẢN LÝ REF
  // =========================================

  // Luôn giữ danh sách đáp án mới nhất
  const userAnswersRef = useRef(userAnswers);

  userAnswersRef.current = userAnswers;

  // Ngăn nộp bài nhiều lần
  const submittingRef = useRef(false);

  // =========================================
  // 4. LẤY THÔNG TIN LƯỢT THI
  // =========================================

  useEffect(() => {
    if (attemptId) {
      dispatch(fetchExamAttemptDetail(attemptId));
    }

    return () => {
      dispatch(clearExamAttemptDetail());
    };
  }, [dispatch, attemptId]);

  // =========================================
  // 5. LẤY DANH SÁCH CÂU HỎI
  // =========================================

  useEffect(() => {
    if (attempt?.exam_id && attempt.status === "in_progress") {
      dispatch(fetchExamQuestions(attempt.exam_id));
    }
  }, [dispatch, attempt?.exam_id, attempt?.status]);

  // =========================================
  // 6. XÁC ĐỊNH CÂU HỎI HIỆN TẠI
  // =========================================

  const currentQuestion = questions?.[currentIndex];

  // Tìm đáp án đã chọn
  const selectedAnswer = userAnswers.find(
    (item) =>
      String(item.question_id) === String(currentQuestion?.id)
  );

  // =========================================
  // 7. XỬ LÝ KHI NGƯỜI DÙNG CHỌN ĐÁP ÁN
  // =========================================

  const handleAnswerChange = (answerId) => {
    if (!currentQuestion || submittingRef.current) return;

    setUserAnswers((prev) => {
      const questionId = String(currentQuestion.id);
      const selectedId = String(answerId);

      // Kiểm tra câu hỏi đã có đáp án chưa
      const existing = prev.find(
        (item) =>
          String(item.question_id) === questionId
      );

      // Nếu đã có thì cập nhật đáp án
      if (existing) {
        return prev.map((item) =>
          String(item.question_id) === questionId
            ? {
                ...item,
                answer_id: selectedId,
              }
            : item
        );
      }

      // Nếu chưa có thì thêm đáp án mới
      return [
        ...prev,
        {
          question_id: questionId,
          answer_id: selectedId,
        },
      ];
    });
  };

  // =========================================
  // 8. HÀM NỘP BÀI
  // =========================================

  const handleSubmit = useCallback(
    async (isAutoSubmit = false) => {
      // Nếu đang nộp thì không gửi thêm request
      if (submittingRef.current) return;

      if (!attemptId || !attempt) return;

      // Chỉ nộp khi lượt thi còn đang thực hiện
      if (attempt.status !== "in_progress") return;

      // Đánh dấu đang nộp bài
      submittingRef.current = true;

      try {
        // Gửi toàn bộ đáp án lên Backend
        await dispatch(
          submitExamAttempt({
            attemptId,
            answers: userAnswersRef.current,
          })
        ).unwrap();

        // Nếu thành công:
        // Redux sẽ lưu kết quả vào submitResult

      } catch (error) {
        console.error("Lỗi nộp bài:", error);

        const expiresAt = new Date(
          attempt.expires_at
        ).getTime();

        const isExpired =
          Number.isFinite(expiresAt) &&
          Date.now() >= expiresAt;

        if (isAutoSubmit || isExpired) {
          // Backend đã hết hạn hoặc request tự động thất bại.
          // Lấy lại trạng thái lượt thi từ Backend.
          dispatch(fetchExamAttemptDetail(attemptId));
        } else {
          // Nếu nộp thủ công gặp lỗi mạng hoặc lỗi khác,
          // cho phép người dùng thử nộp lại.
          submittingRef.current = false;
        }
      }
    },
    [dispatch, attemptId, attempt]
  );

  // =========================================
  // 9. ĐỒNG HỒ ĐẾM NGƯỢC
  // =========================================

  useEffect(() => {
    if (!attempt?.expires_at) return;

    if (attempt.status !== "in_progress") return;

    // Chuyển thời điểm hết hạn thành timestamp
    const expiresAt = new Date(
      attempt.expires_at
    ).getTime();

    if (Number.isNaN(expiresAt)) return;

    // Hàm cập nhật đồng hồ
    const updateTimer = () => {
      const now = Date.now();

      // Tính số giây còn lại
      const remaining = Math.max(
        0,
        Math.ceil((expiresAt - now) / 1000)
      );

      setRemainingSeconds(remaining);

      // Khi hết giờ thì tự động nộp bài
      if (remaining === 0) {
        handleSubmit(true);
      }
    };

    // Cập nhật ngay khi chạy
    updateTimer();

    // Cập nhật mỗi giây
    const timer = setInterval(updateTimer, 1000);

    // Dọn interval khi component bị hủy
    return () => clearInterval(timer);
  }, [attempt?.expires_at, attempt?.status, handleSubmit]);

  // =========================================
  // 10. ĐỊNH DẠNG THỜI GIAN
  // =========================================

  const formatTime = (seconds) => {
    if (seconds === null) return "--:--";

    const minutes = Math.floor(seconds / 60);

    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  };

  // =========================================
  // 11. KIỂM TRA TRẠNG THÁI TẢI DỮ LIỆU
  // =========================================

  if (attemptLoading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Đang tải thông tin lượt thi...
      </Typography>
    );
  }

  if (attemptError) {
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        Lỗi: {attemptError}
      </Typography>
    );
  }

  if (!attempt) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Không tìm thấy lượt thi.
      </Typography>
    );
  }

  // =========================================
  // 12. HIỂN THỊ KẾT QUẢ SAU KHI NỘP BÀI
  // =========================================

  if (submitResult?.status === "submitted") {
    const result = submitResult.attempt;

    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f7fa",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            border: "1px solid #e5e7eb",
          }}
        >
          <Chip
            label="Đã nộp bài thành công"
            color="success"
            sx={{ mb: 3 }}
          />

          <Typography variant="h5" fontWeight={700}>
            Kết quả bài thi
          </Typography>

          <Typography
            variant="h2"
            color="primary"
            fontWeight={700}
            sx={{ my: 3 }}
          >
            {result.score}
          </Typography>

          <Typography color="text.secondary">
            Điểm số của bạn
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography>
            Số câu đúng: {result.correct_answers}/
            {result.total_questions}
          </Typography>
        </Paper>
      </Box>
    );
  }

  // =========================================
  // 13. KIỂM TRA TRẠNG THÁI LƯỢT THI
  // =========================================

  if (attempt.status === "expired") {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Lượt thi đã hết thời gian.
      </Typography>
    );
  }

  if (attempt.status === "submitted") {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Bạn đã nộp bài thi này.
      </Typography>
    );
  }

  // =========================================
  // 14. KIỂM TRA TRẠNG THÁI CÂU HỎI
  // =========================================

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>Đang tải câu hỏi...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Lỗi: {error}
      </Typography>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Đề thi chưa có câu hỏi.
      </Typography>
    );
  }

  // =========================================
  // 15. GIAO DIỆN LÀM BÀI
  // =========================================

  return (
    <Box
      sx={{
        bgcolor: "#f5f7fa",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>

        {/* THÔNG TIN BÀI THI */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
          }}
        >
          <Grid container alignItems="center" spacing={2}>

            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" fontWeight={700}>
                {attempt.exam_title}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Thí sinh: Nguyễn Văn A
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label={`${questions.length} câu hỏi`}
                  color="primary"
                  variant="outlined"
                />

                <Chip
                  label={`Thời gian: ${attempt.duration_minutes} phút`}
                  variant="outlined"
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textAlign: "center",
                  minWidth: 120,
                  bgcolor:
                    remainingSeconds !== null &&
                    remainingSeconds <= 60
                      ? "#ffebee"
                      : "#e3f2fd",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Thời gian còn lại
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={
                    remainingSeconds !== null &&
                    remainingSeconds <= 60
                      ? "error.main"
                      : "primary.main"
                  }
                >
                  {formatTime(remainingSeconds)}
                </Typography>
              </Paper>
            </Grid>

          </Grid>
        </Paper>

        {/* NỘI DUNG LÀM BÀI */}

        <Grid container spacing={3}>

          {/* KHU VỰC CÂU HỎI */}

          {currentQuestion && (
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  minHeight: 450,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Chip
                    label={`Câu hỏi ${currentIndex + 1}`}
                    color="primary"
                  />

                  <Typography color="text.secondary">
                    {currentIndex + 1} / {questions.length} câu
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  {currentQuestion.question_text}
                </Typography>

                <RadioGroup
                  value={selectedAnswer?.answer_id || ""}
                  onChange={(event) =>
                    handleAnswerChange(event.target.value)
                  }
                >
                  {currentQuestion.answers?.map((answer) => (
                    <Paper
                      key={answer.id}
                      variant="outlined"
                      sx={{
                        mb: 2,
                        p: 1,
                        borderRadius: 2,
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "#f5f9ff",
                        },
                      }}
                    >
                      <FormControlLabel
                        value={String(answer.id)}
                        control={<Radio />}
                        label={
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Typography fontWeight={700}>
                              {answer.answer_key}.
                            </Typography>

                            <Typography>
                              {answer.answer_text}
                            </Typography>
                          </Box>
                        }
                        sx={{
                          width: "100%",
                          m: 0,
                          py: 1,
                        }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>

                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    disabled={
                      currentIndex === 0 || submitLoading
                    }
                    onClick={() =>
                      setCurrentIndex((prev) => prev - 1)
                    }
                  >
                    Câu trước
                  </Button>

                  <Button
                    variant="contained"
                    disabled={
                      currentIndex === questions.length - 1 ||
                      submitLoading
                    }
                    onClick={() =>
                      setCurrentIndex((prev) => prev + 1)
                    }
                  >
                    Câu tiếp theo
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}

          {/* DANH SÁCH CÂU HỎI */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Danh sách câu hỏi
              </Typography>

              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ mt: 1, mb: 3 }}
              >
                Chọn câu hỏi để xem nội dung
              </Typography>

              <Grid container spacing={1}>
                {questions.map((question, index) => {
                  const isAnswered = userAnswers.some(
                    (item) =>
                      String(item.question_id) ===
                      String(question.id)
                  );

                  return (
                    <Grid
                      key={question.id}
                      size={{ xs: 2.4 }}
                    >
                      <Button
                        fullWidth
                        variant={
                          index === currentIndex
                            ? "contained"
                            : isAnswered
                              ? "outlined"
                              : "text"
                        }
                        color={
                          isAnswered && index !== currentIndex
                            ? "success"
                            : "primary"
                        }
                        sx={{
                          minWidth: 0,
                          aspectRatio: "1 / 1",
                          borderRadius: 2,
                        }}
                        disabled={submitLoading}
                        onClick={() => setCurrentIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography fontWeight={700} sx={{ mb: 2 }}>
                Chú thích
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label="Đang xem"
                  color="primary"
                  size="small"
                />

                <Chip
                  label="Đã trả lời"
                  color="success"
                  size="small"
                />

                <Chip
                  label="Chưa trả lời"
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Typography sx={{ mt: 3 }} color="text.secondary">
                Đã trả lời: {userAnswers.length}/{questions.length} câu
              </Typography>

              {/* NÚT NỘP BÀI */}

              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 2,
                }}
                onClick={() => handleSubmit(false)}
                disabled={
                  submitLoading ||
                  remainingSeconds === 0 ||
                  submittingRef.current
                }
              >
                {submitLoading
                  ? "Đang nộp bài..."
                  : "Nộp bài thi"}
              </Button>

              {/* THÔNG BÁO LỖI NỘP BÀI */}

              {submitError && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ mt: 2 }}
                >
                  {typeof submitError === "string"
                    ? submitError
                    : submitError.message || "Không thể nộp bài thi"}
                </Typography>
              )}
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}
