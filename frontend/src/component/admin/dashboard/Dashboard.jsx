
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material'

import {
  People,
  School,
  Assignment,
  BarChart,
} from '@mui/icons-material'

const statistics = [
  {
    title: 'Tổng người dùng',
    value: '1.250',
    icon: <People />,
    color: '#3b82f6',
  },
  {
    title: 'Ngành học',
    value: '3',
    icon: <School />,
    color: '#10b981',
  },
  {
    title: 'Tổng đề thi',
    value: '86',
    icon: <Assignment />,
    color: '#f59e0b',
  },
  {
    title: 'Lượt làm bài',
    value: '3.680',
    icon: <BarChart />,
    color: '#8b5cf6',
  },
]

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={800}>
        Dashboard
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Tổng quan hoạt động hệ thống QUẢN LÝ WEB GĐPT MỸ LỢI 
      </Typography>

      <Grid container spacing={2}>
        {statistics.map((item, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px #00000008' }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography color="text.secondary" fontSize={14}>
                      {item.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={800} mt={1}>
                      {item.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: `${item.color}18`,
                      color: item.color,
                      p: 1.5,
                      borderRadius: 2,
                      display: 'flex',
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight={700} mb={1}>
            Chào mừng đến với hệ thống quản trị
          </Typography>

          <Typography color="text.secondary">
            Tại đây, quản trị viên có thể quản lý người dùng,
            ngành học, bậc học, đề thi, bài viết và kết quả thi.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
