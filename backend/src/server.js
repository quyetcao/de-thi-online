// ESM
import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'
import { join } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()



const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fastify = Fastify({ logger: true })


fastify.register(AutoLoad, { dir: join(__dirname, 'plugins') })
fastify.register(AutoLoad, { dir: join(__dirname, 'routes') })


/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()