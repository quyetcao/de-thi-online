
import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material'

import AuthLayout from './authLayout'
import { registerUser } from '../../../services/authApi'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)

  // Lưu thông tin người dùng nhập
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  })

  // Trạng thái gửi dữ liệu
  const [loading, setLoading] = useState(false)

  // Thông báo lỗi và thành công
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Cập nhật dữ liệu khi người dùng nhập
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Xử lý đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault()
//Thông thường, khi gửi form HTML, trình duyệt có thể tải lại trang. React cần ngăn hành vi đó để tự xử lý dữ liệu.
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await registerUser(formData)
      setSuccess('Đăng ký tài khoản thành công! Bạn có thể đăng nhập.')
      // Xóa dữ liệu sau khi đăng ký thành công
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
      })
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      sx={{  fontFamily:"Oswald , sans-serif",}}
      title="Tạo tài khoản"
      subtitle="Cùng nhau học tập và trưởng dưỡng trong tình lam"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success">
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Tên đăng nhập"
            placeholder="Ví dụ: nguyenvana"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            placeholder="example@gmail.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            placeholder="Tối thiểu 8 ký tự"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            inputProps={{ minLength: 8 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? 'Ẩn' : 'Hiện'}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 1,
              borderRadius: 3,
              fontWeight: 700,
              bgcolor: '#719879',
              '&:hover': {
                bgcolor: '#52785A',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'TẠO TÀI KHOẢN'
            )}
          </Button>

          <Typography textAlign="center" variant="body2">
            Đã có tài khoản?{' '}
            <Link
              href="/login"
              underline="hover"
              fontWeight={700}
              sx={{ color: '#244C70' }}
            >
              Đăng nhập
            </Link>
          </Typography>

        </Stack>
      </Box>
    </AuthLayout>
  )
}
