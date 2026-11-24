import React, { useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Stack,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamHistory } from "../../../redux/user/userThunk";

const Profile = () => {
  // Dữ liệu minh họa, sau này kết nối API người dùng
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.userAttemptHistory);

  useEffect(() => {
    dispatch(fetchExamHistory());
  }, [dispatch]);

  const completedExams = items.length;

  const passedExams = items.filter(
    (exam) => exam.score != null && exam.score >= 5,
  ).length;

  const averageScore =
    completedExams > 0
      ? (
          items.reduce((total, exam) => total + Number(exam.score), 0) /
          completedExams
        ).toFixed(1)
      : 0;
  // chỉnh ngày
  const formatDate = (date) => {
    if (!date) return "Chưa nộp";

    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <Box
      sx={{
        bgcolor: "#f5f7f6",
        minHeight: "100vh",
        py: 4,
        fontFamily: "Oswald, sans-serif",
      }}
    >
      <Container maxWidth="lg">
        {/* Tiêu đề */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            color="#245c40"
            sx={{ fontFamily: "Oswald, sans-serif" }}
          >
            Hồ sơ đoàn sinh
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5, fontFamily: "Oswald, sans-serif" }}
          >
            Thông tin cá nhân và quá trình học tập, kiểm tra của đoàn sinh.
          </Typography>
        </Box>

        {/* Thông tin cá nhân */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid #e5ebe7",
            mb: 3,
            fontFamily: "Oswald, sans-serif",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "center", sm: "center" }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#dcefe3",
                color: "#26734d",
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: 60 }} />
            </Avatar>

            <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ fontFamily: "Oswald, sans-serif" }}
              >
                {user.full_name}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Đoàn sinh Gia đình Phật tử
              </Typography>

              <Chip
                label="Tài khoản hoạt động"
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Thông tin cá nhân
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonOutlineIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Tên tài khoản
                  </Typography>
                  <Typography
                    fontWeight={600}
                    sx={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {user.username}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonOutlineIcon color="action" />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    Họ và tên đầy đủ
                  </Typography>
                  <Typography
                    fontWeight={600}
                    sx={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {user.full_name}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailOutlinedIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Gmail
                  </Typography>
                  <Typography
                    fontWeight={600}
                    sx={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Thống kê kết quả */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Tổng quan kết quả thi
        </Typography>

        <Grid
          container
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          {[
            {
              title: "Đề thi đã hoàn thành",
              value: completedExams,
              icon: <AssignmentOutlinedIcon />,
              color: "#2476c7",
            },
            {
              title: "Số đề đạt",
              value: passedExams,
              icon: <EmojiEventsOutlinedIcon />,
              color: "#26965d",
            },
            {
              title: "Điểm trung bình",
              value: averageScore,
              icon: <TrendingUpIcon />,
              color: "#e69a26",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index} sx={{ minWidth: 0 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: { xs: 2.5, sm: 3 },
                  border: "1px solid #e5ebe7",
                  height: "100%",
                  minWidth: 0,
                  boxSizing: "border-box",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{
                        fontSize: { xs: 12, sm: 14 },
                        lineHeight: 1.5,
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{
                        mt: 1,
                        color: item.color,
                        fontSize: {
                          xs: "1.75rem",
                          sm: "2rem",
                          md: "2.125rem",
                        },
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      "& svg": {
                        fontSize: { xs: 30, sm: 36 },
                      },
                    }}
                  >
                    {item.icon}
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Lịch sử thi */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #e5ebe7",
            overflow: "hidden",
            marginTop: "100px",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Lịch sử làm bài thi
            </Typography>

            <Typography color="text.secondary" variant="body2">
              Danh sách các đề thi đoàn sinh đã hoàn thành.
            </Typography>
          </Box>

          <Divider />

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#f1f7f3" }}>
                <TableRow>
                  <TableCell>
                    <b>STT</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên đề thi</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày thi</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Điểm</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Kết quả</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((exam, index) => (
                  <TableRow key={exam.id} hover>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <Typography fontWeight={600}>{exam.title}</Typography>
                    </TableCell>

                    <TableCell  sx={{ fontFamily: "Oswald, sans-serif" }}>{formatDate(exam.submitted_at)}</TableCell>

                    <TableCell align="center">
                      <Typography
                        fontWeight={800}
                        color={exam.score >= 5 ? "success.main" : "error.main"}
                      >
                        {exam.score}/10
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={exam.score >= 5 ? "Đạt" : "Không đạt"}
                        color={exam.score >= 5 ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Chưa có lịch sử làm bài thi.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
