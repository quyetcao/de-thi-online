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
import { fetchExamQuestions } from "../../../redux/exams/examQuestionThunk";
import { useEffect, useState } from "react";

export default function ExamTaking() {
  // Quản lý state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const { examId } = useParams();
  console.log("hihh", examId);
  const dispatch = useDispatch();

  // 2. Lấy danh sách và trạng thái từ Redux
  const { exam, questions, loading, error } = useSelector(
    (state) => state.examQuestion,
  );

  useEffect(() => {
    const id = Number(examId);

    if (Number.isInteger(id) && id > 0) {
      dispatch(fetchExamQuestions(id));
    }
  }, [dispatch, examId]);

  // 4. Hiển thị trạng thái tải
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <span className="loader"></span>
      </div>
    );
  }

  // 5. Hiển thị lỗi nếu API thất bại
  if (error) {
    return <p>Lỗi: {error}</p>;
  }
  const currentQuestion = questions[currentIndex];
  console.log("addsfdfd", questions);

  const selectedAnswer = userAnswers.find(
  (item) => item.question_id === currentQuestion?.id
);

  /// chọn đáp án và lưu vào state 
  const handleAnswerChange = (answerId) => {
  setUserAnswers((prev) => {
    const existing = prev.find(
      (item) => item.question_id === currentQuestion.id
    );

    if (existing) {
      return prev.map((item) =>
        item.question_id === currentQuestion.id
          ? { ...item, answer_id: Number(answerId) }
          : item
      );
    }

    return [
      ...prev,
      {
        question_id: currentQuestion.id,
        answer_id: Number(answerId),
      },
    ];
  });
};

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", p: 3 }}>
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
                Bài kiểm tra kiến thức Phật pháp
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Thí sinh: Nguyễn Văn A
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                <Chip label="20 câu hỏi" color="primary" variant="outlined" />
                <Chip label="Thời gian: 30 phút" variant="outlined" />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  bgcolor: "#fff3e0",
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
                elevation={0}
              >
                <Typography color="text.secondary">
                  Thời gian còn lại
                </Typography>
                <Typography variant="h4" fontWeight={700} color="error.main">
                  29:59
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
                  <Chip label={`Câu hỏi ${currentIndex + 1}`} color="primary" />

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
                  value={selectedAnswer?.answer_id?.toString() || ""}
                  onChange={(event) => handleAnswerChange(event.target.value)}
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
                        value={answer.id.toString()}
                        control={<Radio />}
                        label={
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Typography fontWeight={700}>
                              {answer.answer_key}.
                            </Typography>
                            <Typography>{answer.answer_text}</Typography>
                          </Box>
                        }
                        sx={{ width: "100%", m: 0, py: 1 }}
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
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                  >
                    Câu trước
                  </Button>

                  <Button
                    variant="contained"
                    disabled={currentIndex === questions.length - 1}
                    onClick={() => setCurrentIndex(currentIndex + 1)}
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
                {questions.map((questions, index) => (
                  <Grid key={index} size={{ xs: 2.4 }}>
                    <Button
                      fullWidth
                      variant={
                        index === currentIndex ? "contained" : "outlined"
                      }
                      sx={{
                        minWidth: 0,
                        aspectRatio: "1 / 1",
                        borderRadius: 2,
                      }}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {Number(index + 1)}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography fontWeight={700} sx={{ mb: 2 }}>
                Chú thích
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip label="Đang xem" color="primary" size="small" />
                <Chip label="Chưa trả lời" variant="outlined" size="small" />
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 4, py: 1.5, borderRadius: 2 }}
              >
                Nộp bài thi
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
