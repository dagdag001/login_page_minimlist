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
  
  // Create users table
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
  
  // Create reviews table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      user_email VARCHAR(320) NOT NULL,
      user_name VARCHAR(200) NOT NULL,
      destination VARCHAR(500) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT NOT NULL,
      helpful_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
    );
  `);
  
  // Create index for faster queries
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_reviews_destination ON reviews(destination);
    CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
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

// Review functions
async function createReview(userEmail, userName, destination, rating, reviewText) {
  const { rows } = await pool.query(
    `INSERT INTO reviews (user_email, user_name, destination, rating, review_text)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_email, user_name, destination, rating, review_text, helpful_count, created_at`,
    [userEmail, userName, destination, rating, reviewText]
  );
  return rows[0];
}

async function getReviews(destination = null, limit = 50, offset = 0) {
  let query = `
    SELECT id, user_name, destination, rating, review_text, helpful_count, created_at
    FROM reviews
  `;
  const params = [];
  
  if (destination) {
    query += ` WHERE destination = $1`;
    params.push(destination);
  }
  
  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);
  
  const { rows } = await pool.query(query, params);
  return rows;
}

async function incrementHelpfulCount(reviewId) {
  const { rows } = await pool.query(
    `UPDATE reviews SET helpful_count = helpful_count + 1 
     WHERE id = $1 
     RETURNING helpful_count`,
    [reviewId]
  );
  return rows[0];
}

async function getReviewStats() {
  const { rows } = await pool.query(`
    SELECT 
      COUNT(*) as total_reviews,
      AVG(rating) as average_rating,
      COUNT(DISTINCT destination) as destinations_reviewed
    FROM reviews
  `);
  return rows[0];
}

module.exports = {
  initDb,
  signupUser,
  findUserByEmail,
  upsertGoogleUser,
  createReview,
  getReviews,
  incrementHelpfulCount,
  getReviewStats,
};
