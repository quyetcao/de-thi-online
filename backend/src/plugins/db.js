import fp from "fastify-plugin";
import pg from "pg";

const { Pool } = pg;

async function dbPlugin(fastify) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  });

const dbInfo = await pool.query(`
  SELECT
    current_database() AS database,
    current_user AS username,
    current_schema() AS schema,
    inet_server_addr()::text AS server_address,
    inet_server_port() AS server_port
`);

console.log('📌 DATABASE INFO:', dbInfo.rows[0]);

const tables = await pool.query(`
  SELECT table_schema, table_name
  FROM information_schema.tables
  WHERE table_name = 'users'
`);

console.log('📌 USERS TABLE:', tables.rows);

  fastify.decorate("db", pool);

  fastify.addHook("onClose", async () => {
    await pool.end();
  });
}

export default fp(dbPlugin, {
  name: "db",
});