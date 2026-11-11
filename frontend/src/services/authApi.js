const API_URL = import.meta.env.VITE_API_URL

// Đăng ký tài khoản
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Đăng ký tài khoản thất bại')
  }

  return result.data
}

// Đăng nhập
export async function loginUser(loginData) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Đăng nhập thất bại')
  }

  return result.data
}