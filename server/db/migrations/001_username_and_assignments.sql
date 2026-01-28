-- Run this once if you had the old users table (email-only) and need username + assignments.
-- Usage: psql -d guanyu -f server/db/migrations/001_username_and_assignments.sql

-- Add username (nullable first, backfill, then enforce)
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255);
UPDATE users SET username = COALESCE(email, 'user_' || id::text) WHERE username IS NULL OR username = '';
ALTER TABLE users ALTER COLUMN username SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS users_username_key ON users(username);

-- Make email optional (in case it was NOT NULL)
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;

-- Assignments and completions (no-op if already exist)
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
