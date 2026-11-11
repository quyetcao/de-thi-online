// Lưu thông tin người dùng sau khi đăng nhập
export const saveAuth = (data) => {
  localStorage.setItem('token', data.token)

  localStorage.setItem(
    'user',
    JSON.stringify(data.user)
  )
}

// Lấy token
export const getToken = () => {
  return localStorage.getItem('token')
}

// Lấy thông tin người dùng
export const getUser = () => {
  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) : null
}

// Xóa thông tin khi đăng xuất
export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}