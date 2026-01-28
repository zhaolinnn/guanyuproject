import { query } from '../db.js';

/**
 * Assignments and completion tracking.
 *
 * To add new assignments: INSERT into the assignments table (see addAssignment or run SQL).
 * Completions are recorded in user_assignment_completions; the app checks that table
 * to see if a user has done an assignment.
 */

export async function listAssignments() {
  const { rows } = await query(
    `SELECT id, title, slug, sort_order, created_at
     FROM assignments
     ORDER BY sort_order ASC, id ASC`
  );
  return rows;
}

export async function getAssignmentBySlug(slug) {
  const { rows } = await query(
    `SELECT id, title, slug, sort_order, created_at
     FROM assignments
     WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function getCompletionsForUser(userId) {
  const { rows } = await query(
    `SELECT assignment_id, completed_at
     FROM user_assignment_completions
     WHERE user_id = $1`,
    [userId]
  );
  return rows; // { assignment_id, completed_at }[]
}

export async function recordCompletion(userId, assignmentId) {
  await query(
    `INSERT INTO user_assignment_completions (user_id, assignment_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, assignment_id) DO UPDATE SET completed_at = NOW()`,
    [userId, assignmentId]
  );
}

export async function hasCompleted(userId, assignmentId) {
  const { rows } = await query(
    `SELECT 1 FROM user_assignment_completions
     WHERE user_id = $1 AND assignment_id = $2`,
    [userId, assignmentId]
  );
  return rows.length > 0;
}

/**
 * Add a new assignment. Call this when you introduce a new lesson/assignment,
 * or run equivalent SQL.
 */
export async function addAssignment({ title, slug, sort_order = 0 }) {
  const { rows } = await query(
    `INSERT INTO assignments (title, slug, sort_order)
     VALUES ($1, $2, $3)
     RETURNING id, title, slug, sort_order, created_at`,
    [title, slug, sort_order]
  );
  return rows[0];
}
