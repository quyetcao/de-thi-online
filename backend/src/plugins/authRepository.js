
import fp from 'fastify-plugin'
import authRepository from '../repositories/auth.repository.js'

export default fp(
  async (fastify) => {
    const repository = await authRepository(fastify)

    fastify.decorate('authRepository', repository)

    // console.log('✅ Auth Repository registered')
  },
  {
    name: 'authRepository',
    dependencies: ['db'],
  }
)
//File này có nhiệm vụ đăng ký Repository vào hệ thống Fastify, để những thành phần khác như Service và Route có thể sử dụng Repository thông qua đối tượng fastify.