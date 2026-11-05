
// ESM
import Fastify from 'fastify'
import cors from '@fastify/cors'
import AutoLoad from '@fastify/autoload'
import { join } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fastify = Fastify({ logger: true })

// 1. Danh sách địa chỉ frontend được phép truy cập API
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean)

// 2. Đăng ký CORS
await fastify.register(cors, {
  origin: allowedOrigins,
})

// 3. Tự động nạp Plugins
fastify.register(AutoLoad, {
  dir: join(__dirname, 'plugins'),
})

// 4. Tự động nạp Routes
fastify.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
})

// 5. Khởi động server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000

    await fastify.listen({
      port,
      host: '0.0.0.0',
    })

    console.log(fastify.printRoutes())
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
