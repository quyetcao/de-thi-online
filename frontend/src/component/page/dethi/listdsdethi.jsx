
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchExams } from '../../../redux/exams/examThunk'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

export default function ListDeThiTheoBacHoc() {
  // 1. Lấy LevelId từ URL, ví dụ /danh-sach-dt/1
  const { levelId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // 2. Lấy danh sách và trạng thái từ Redux
  const { items = [], loading, error } = useSelector(
    (state) => state.exams 
  )

console.log('Level ID:', levelId)

  useEffect(() => {
    const id = Number(levelId)

    if (Number.isInteger(id) && id > 0) {
      dispatch(fetchExams(id))
    }
  }, [dispatch, levelId])

  // 4. Hiển thị trạng thái tải
  if (loading) {
    return (
     <div style={{ textAlign: 'center', marginTop: '20px' }}>
           <span class="loader"></span>
     </div>
    )
    
  }

  // 5. Hiển thị lỗi nếu API thất bại
  if (error) {
    return <p>Lỗi: {error}</p>
  }

  // 6. Hiển thị danh sách bậc học
  console.log("hihh", items);
  return (

<Box
      sx={{
          fontFamily: "'Lexend', sans-serif",
        minHeight: "100vh",
       width: "100%",
       boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: "#f5f1ed",
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {/* Tiêu đề chương */}
      <Box
        sx={{
          borderLeft: "5px solid #16a34a",
          pl: 1.5,
          py: 0.7,
          mb: 2,
          ml: 0.5,
        }}
      >
        <Typography
          sx={{
              fontFamily: "'Lexend', sans-serif",
            fontSize: {
              xs: 17,
              sm: 20,
            },
            fontWeight: 800,
            color: "#001b85",
          }}
        >
         HỆ THỐNG BÀI THI TRỰC TUYẾN ( GĐPT VỚI CÔNG NGHỆ )
        </Typography>
      </Box>

      {/* Danh sách bài thi */}
     {items.length === 0 ? (
  <Typography textAlign="center" py={4}>
    Chưa có bài thi.
  </Typography>
) : (
  <Grid
    container
    spacing={3}
    sx={{
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    {items.map((exam) => (
      <Grid
        key={exam.id}
        size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
      >
        <Card
          elevation={0}
          sx={{
            height: "100%",
            borderRadius: 3,
            backgroundColor: "#fff",
            transition: "0.3s",

            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 5px 18px rgba(0,0,0,0.10)",
            },
          }}
        >
          <CardContent sx={{ p: 2 }}>
            {/* Tên bài thi */}
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: "#001b85",
                lineHeight: 1.6,
                minHeight: 48,
                mb: 2,
              }}
            >
              {exam.title}
            </Typography>

            {/* Điểm và thời gian */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                mb: 2,
                flexWrap: "wrap",
                rowGap: 1,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
              >
                <ChatBubbleOutlineIcon
                  sx={{ fontSize: 18, color: "#16a34a" }}
                />
                <Typography fontSize={14}>
                  {exam.passing_score} Điểm
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
              >
                <AccessTimeIcon
                  sx={{ fontSize: 18, color: "#16a34a" }}
                />
                <Typography fontSize={14}>
                  {exam.duration_minutes} Phút
                </Typography>
              </Stack>
            </Stack>

            {/* Nút làm đề */}
            <Button
              variant="contained"
              onClick={() => navigate(`/lam-bai/${exam.id}`)}
              fullWidth
              sx={{
                backgroundColor: "#16a34a",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                fontSize: 14,
                borderRadius: 2,
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#15803d",
                  boxShadow: "none",
                },
              }}
            >
              Làm đề
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}
    </Box>
              
  )
}
