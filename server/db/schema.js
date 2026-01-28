/**
 * Database schema: users, assignments, user_assignment_completions.
 * initDb() in ../db.js runs these. To add new assignments, INSERT into assignments
 * and optionally seed completions; see server/db/README.md.
 */

export const USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255)
  )
`;

export const ASSIGNMENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`;

export const COMPLETIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS user_assignment_completions (
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assignment_id INT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, assignment_id)
  )
`;
