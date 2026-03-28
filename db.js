const { Pool } = require("pg");

let pool;

async function initDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set (e.g. postgresql://user:pass@localhost:5432/auth)"
    );
  }
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(320) UNIQUE NOT NULL,
      name VARCHAR(200) NOT NULL,
      password TEXT,
      location VARCHAR(500) NOT NULL DEFAULT '',
      birthdate VARCHAR(40) NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function signupUser(name, email, password, location, birthdate) {
  const result = await pool.query(
    `INSERT INTO users (email, name, password, location, birthdate)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING
     RETURNING id`,
    [email, name, password, location, birthdate]
  );
  if (result.rowCount === 0) {
    return { conflict: true };
  }
  return { ok: true };
}

async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT name, email, password FROM users WHERE email = $1",
    [email]
  );
  return rows[0] || null;
}

async function upsertGoogleUser(email, name) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, name, password, location, birthdate)
     VALUES ($1, $2, NULL, '', '')
     ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
     RETURNING name, email`,
    [email, name]
  );
  return rows[0];
}

module.exports = {
  initDb,
  signupUser,
  findUserByEmail,
  upsertGoogleUser,
};
