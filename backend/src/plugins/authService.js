import fp from 'fastify-plugin'
import authService from '../services/auth.service.js'

export default fp(
  async (fastify) => {
    const service = await authService(fastify)

    fastify.decorate('authService', service)

    // console.log('✅ Auth Service registered')
  },
  {
    name: 'authService',
  dependencies: ['authRepository', 'jwt'],
  }
)
// {
//   name: 'authRepository',
//   dependencies: ['db'],
// }


// 1. name: 'authRepository': Đặt tên cho Plugin để Fastify nhận diện và quản lý nó.
// 2. dependencies: ['db']: Báo cho Fastify biết Plugin authRepository bắt buộc cần Plugin db tồn tại trước khi khởi chạy.