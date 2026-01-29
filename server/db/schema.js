/**
 * Database schema: users, assignments, user_assignment_completions.
 * No courses table — "courses" are just groupings by course_slug on assignments.
 * Track completions per assignment; you can count how many a user completed per course.
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
    course_slug VARCHAR(255) NOT NULL,
    course_title VARCHAR(500) NOT NULL,
    course_description TEXT,
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
