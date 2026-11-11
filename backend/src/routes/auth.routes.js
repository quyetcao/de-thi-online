
export default async function authRoutes(fastify) {

  // =================================
  // API ĐĂNG KÝ
  // POST /api/auth/register
  // =================================
  fastify.post('/register', async (request, reply) => {
    try {
      const user = await fastify.authService.register(request.body)

      return reply.code(201).send({
        success: true,
        message: 'Đăng ký tài khoản thành công',
        data: user,
      })
    } catch (error) {
      fastify.log.error(error)

      return reply.code(error.statusCode || 500).send({
        success: false,
        message: error.statusCode
          ? error.message
          : 'Đã xảy ra lỗi máy chủ',
      })
    }
  })


  // =================================
  // API ĐĂNG NHẬP
  // POST /api/auth/login
  // =================================
  fastify.post('/login', async (request, reply) => {
    try {
      const result = await fastify.authService.login(request.body)

      return reply.code(200).send({
        success: true,
        message: 'Đăng nhập thành công',
        data: result,
      })
    } catch (error) {
      fastify.log.error(error)

      return reply.code(error.statusCode || 500).send({
        success: false,
        message: error.statusCode
          ? error.message
          : 'Đã xảy ra lỗi máy chủ',
      })
    }
  })


  // =================================
  // API KIỂM TRA ĐĂNG NHẬP
  // GET /api/auth/me
  // =================================
  fastify.get(
    '/me',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      return {
        success: true,
        message: 'Xác thực thành công',
        user: request.user,
      }
    }
  )


  // =================================
  // API KIỂM TRA QUYỀN ADMIN
  // GET /api/auth/admin-test
  // =================================
  fastify.get(
    '/admin-test',
    {
      preHandler: [
        fastify.authenticate,
        fastify.authorizeRoles('admin'),
      ],
    },
    async (request, reply) => {
      return {
        success: true,
        message: 'Chào mừng Admin!',
        user: request.user,
      }
    }
  )

}
