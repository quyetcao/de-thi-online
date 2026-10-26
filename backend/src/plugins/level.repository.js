import fp from 'fastify-plugin'
import levelRepository from '../repositories/level.repository.js'
// tạo plugin để đăng ký levelRepository vào fastify instance, giúp các service khác có thể sử dụng repository này thông qua fastify.levelRepository
export default fp(async (fastify) => {
  const repository = await levelRepository(fastify)

  fastify.decorate('levelRepository', repository)
})