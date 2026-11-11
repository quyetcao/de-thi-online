
import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  Stack,
} from '@mui/material'

import AuthLayout from './authLayout'
import { loginUser } from '../../../services/authApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'


export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  // Trạng thái gửi dữ liệu
  const [loading, setLoading] = useState(false)

  // Thông báo lỗi và thành công
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })

    const handleChange = (e) => {
      //e là đối tượng sự kiện (event object) mà React truyền vào hàm khi người dùng tương tác với một ô nhập liệu.
    const { name, value } = e.target
    console.log("hihi", name)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


const handleSubmit = async (e) => {
  e.preventDefault()
//Thông thường, khi gửi form HTML, trình duyệt có thể tải lại trang. React cần ngăn hành vi đó để tự xử lý dữ liệu.
  setError('')
  setSuccess('')
  setLoading(true)

  try {
    // 1. Gửi thông tin đăng nhập đến Backend
    const result = await loginUser(formData)

    // 2. Cập nhật trạng thái đăng nhập và lưu user vào localStorage
    login(result)

    setSuccess('Đăng nhập thành công.')

    // 3. Xóa dữ liệu form
    setFormData({
      identifier: '',
      password: '',
    })

    // 4. Điều hướng theo quyền
    if (result.user.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }

  } catch (err) {
    setError(err.message || 'Đăng nhập thất bại')
  } finally {
    setLoading(false)
  }
}


  return (
    <AuthLayout
      title="Chào mừng trở lại!"
      subtitle="Đăng nhập để tiếp tục hành trình học tập"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={2.5}>
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
            label="Tên đăng nhập hoặc Email"
            placeholder="Nhập username hoặc email"
            required
            name="identifier"
              value={formData.identifier}
              onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
              name="password"
             value={formData.password}
              onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            required
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

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox color="success" />}
              label={
                <Typography variant="body2">
                  Ghi nhớ đăng nhập
                </Typography>
              }
            />

            <Link
              href="#"
              underline="hover"
              sx={{ color: '#719879', fontSize: 13 }}
            >
              Quên mật khẩu?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              bgcolor: '#244C70',
              '&:hover': {
                bgcolor: '#193B59',
              },
            }}
          >
            ĐĂNG NHẬP
          </Button>

          <Typography textAlign="center" variant="body2">
            Chưa có tài khoản?{' '}
            <Link
              href="/register"
              underline="hover"
              fontWeight={700}
              sx={{ color: '#719879' }}
            >
              Đăng ký ngay
            </Link>
          </Typography>

        </Stack>
      </Box>
    </AuthLayout>
  )
}
