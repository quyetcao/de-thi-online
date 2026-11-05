import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async (fastify) => {
  const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean)

  await fastify.register(cors, {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
})