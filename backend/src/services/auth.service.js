
import bcrypt from 'bcryptjs'

export default async function authService(fastify) {
  // Tạo lỗi có mã HTTP
  const createError = (message, statusCode) => {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }

  // ĐĂNG KÝ TÀI KHOẢN
  const register = async (data = {}) => {
    const { username, email, password, fullName } = data

    // 1. Kiểm tra dữ liệu
    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof fullName !== 'string'
    ) {
      throw createError('Vui lòng nhập đầy đủ thông tin hợp lệ', 400)
    }

    // 2. Chuẩn hóa dữ liệu
    const cleanUsername = username.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanFullName = fullName.trim()

    if (!cleanUsername || !cleanEmail || !cleanFullName || !password) {
      throw createError('Vui lòng nhập đầy đủ thông tin', 400)
    }

    // 3. Kiểm tra username
    if (cleanUsername.length < 3 || cleanUsername.length > 50) {
      throw createError('Username phải từ 3 đến 50 ký tự', 400)
    }

    // 4. Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(cleanEmail)) {
      throw createError('Email không hợp lệ', 400)
    }

    // 5. Kiểm tra họ tên
    if (cleanFullName.length > 150) {
      throw createError('Họ tên không được quá 150 ký tự', 400)
    }

    // 6. Kiểm tra mật khẩu
    if (password.length < 8) {
      throw createError('Mật khẩu phải có ít nhất 8 ký tự', 400)
    }

    // 7. Kiểm tra tài khoản tồn tại
    const existingUser =
      await fastify.authRepository.findExistingUser(
        cleanUsername,
        cleanEmail
      )

    if (existingUser) {
      throw createError('Username hoặc email đã được sử dụng', 409)
    }

    // 8. Mã hóa mật khẩu
    const passwordHash = await bcrypt.hash(password, 12)

    // 9. Lưu vào Database
    try {
      const user = await fastify.authRepository.createUser({
        username: cleanUsername,
        email: cleanEmail,
        passwordHash,
        fullName: cleanFullName,
      })

      return user
    } catch (error) {
      // Xử lý trường hợp hai yêu cầu đăng ký trùng nhau
      if (error.code === '23505') {
        throw createError('Username hoặc email đã được sử dụng', 409)
      }

      throw error
    }
  }

  // ĐĂNG NHẬP
  const login = async (data = {}) => {
    const { identifier, password } = data

    if (
      typeof identifier !== 'string' ||
      typeof password !== 'string' ||
      !identifier.trim() ||
      !password
    ) {
      throw createError('Vui lòng nhập tài khoản và mật khẩu', 400)
    }

    // Tìm bằng username hoặc email
    const user =
      await fastify.authRepository.findUserByUsernameOrEmail(
        identifier.trim().toLowerCase()
      )

    if (!user) {
      throw createError('Tài khoản hoặc mật khẩu không chính xác', 401)
    }

    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!isPasswordValid) {
      throw createError('Tài khoản hoặc mật khẩu không chính xác', 401)
    }

    // Tạo JWT
    const token = fastify.jwt.sign({
      id: user.id,
      role: user.role,
    })

    // Không trả password_hash về Frontend
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
      token,
    }
  }

  return {
    register,
    login,
  }
}
