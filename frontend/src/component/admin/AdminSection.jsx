
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

export default function AdminSection({ title, description }) {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            {title}
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            {description}
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />}>
          Thêm mới
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TextField
            size="small"
            placeholder={`Tìm kiếm ${title.toLowerCase()}...`}
            sx={{ width: { xs: '100%', sm: 350 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              minHeight: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary">
              Dữ liệu quản lý sẽ được hiển thị tại đây.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
