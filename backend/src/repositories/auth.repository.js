export default async function authRepository(fastify) {
  const findUserByUsernameOrEmail = async (identifier) => {
    const result = await fastify.db.query(
      `
        SELECT
          id,
          username,
          email,
          password_hash,
          full_name,
          role,
          created_at
        FROM users
        WHERE username = $1 OR email = $1
        LIMIT 1
      `,
      [identifier]
    );

    return result.rows[0] ?? null;
  };
//identifier là thông tin định danh dùng để xác định tài khoản người dùng.
//identifier giúp một ô đăng nhập hỗ trợ cả hai cách.
  const findExistingUser = async (username, email) => {
    const result = await fastify.db.query(
      `
        SELECT id, username, email
        FROM users
        WHERE username = $1 OR email = $2
        LIMIT 1
      `,
      [username, email]
    );

    return result.rows[0] ?? null;
  };

  const createUser = async ({
    username,
    email,
    passwordHash,
    fullName,
  }) => {
    const result = await fastify.db.query(
      `
        INSERT INTO users (
          username,
          email,
          password_hash,
          full_name,
          role
        )
        VALUES ($1, $2, $3, $4, 'user')
        RETURNING
          id,
          username,
          email,
          full_name,
          role,
          created_at
      `,
      [username, email, passwordHash, fullName]
    );

    return result.rows[0];
  };

  return {
    findUserByUsernameOrEmail,
    findExistingUser,
    createUser,
  };
}