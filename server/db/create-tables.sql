-- Run this to create tables if they don't exist.
-- Usage: psql $DATABASE_URL -f server/db/create-tables.sql
-- Or: psql -d guanyu -f server/db/create-tables.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_assignment_completions (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assignment_id INT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, assignment_id)
);
