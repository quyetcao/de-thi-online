import fp from 'fastify-plugin'
import pg from 'pg'

const { Pool } = pg

export default fp(async (fastify) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
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