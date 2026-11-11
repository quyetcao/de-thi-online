import fp from 'fastify-plugin'

async function authGuard(fastify) {

  // Hàm kiểm tra JWT trước khi truy cập API
  fastify.decorate('authenticate', async function (request, reply) {
    try {
      // Xác minh Token từ request
      await request.jwtVerify()

    } catch (error) {
      return reply.code(401).send({
        success: false,
        message: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn',
      })
    }
  })

  console.log('✅ Auth Guard registered')
   // 2. Kiểm tra vai trò người dùng
  fastify.decorate('authorizeRoles', (...allowedRoles) => {
    return async function (request, reply) {

      // Kiểm tra vai trò có được phép không
      if (!allowedRoles.includes(request.user?.role)) {
        return reply.code(403).send({
          success: false,
          message: 'Bạn không có quyền truy cập chức năng này',
        })
      }
    }
  })

  console.log('✅ Auth Guard registered')
}

export default fp(authGuard, {
  name: 'authGuard',
  dependencies: ['jwt'],
})