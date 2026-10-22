import fp from 'fastify-plugin'
import pg from 'pg'

const { Pool } = pg

export default fp(async (fastify) => {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })

  try {
    await pool.query('SELECT 1')

    console.log('✅ Database connected')
  } catch (error) {
    console.error('❌ Database connection failed')
    console.error(error)

    throw error
  }

  fastify.decorate('db', pool)
})