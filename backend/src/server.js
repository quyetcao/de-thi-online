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

// 1. Cho phép frontend truy cập API
await fastify.register(cors, {
  origin: 'http://localhost:5173',
})

fastify.register(AutoLoad, { dir: join(__dirname, 'plugins') })
fastify.register(AutoLoad, { dir: join(__dirname, 'routes') })

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })

    console.log(fastify.printRoutes())
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()