
import {
  createContext,
  useContext,
  useState,
} from 'react'

import {
  getUser,
  saveAuth,
  clearAuth,
} from '../services/authStorage'

// Tạo nơi lưu trữ trạng thái đăng nhập dùng chung
const AuthContext = createContext(null)

// Cung cấp trạng thái đăng nhập cho toàn bộ ứng dụng
export function AuthProvider({ children }) {
  // Khi tải trang, lấy người dùng đã lưu trước đó
  const [user, setUser] = useState(() => getUser())

  // Gọi khi đăng nhập thành công
  const login = (data) => {
    saveAuth(data)
    setUser(data.user)
  }

  // Gọi khi đăng xuất
  const logout = () => {
    clearAuth()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook để các component lấy thông tin đăng nhập
export function useAuth() {
  return useContext(AuthContext)
}
