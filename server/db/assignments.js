import { query } from '../db.js';

/**
 * Assignments and completion tracking.
 * No courses table — courses are groupings by course_slug. User completions
 * are in user_assignment_completions (count per course = count where assignment.course_slug = X).
 */

/** List "courses" — one row per course_slug (title/description from first assignment) */
export async function listCoursesFromAssignments() {
  const { rows } = await query(
    `SELECT DISTINCT ON (course_slug) course_slug AS slug, course_title AS title, course_description AS description
     FROM assignments
     ORDER BY course_slug, sort_order ASC`
  );
  return rows;
}

/** All assignments for a course (by course_slug) */
export async function getAssignmentsByCourseSlug(courseSlug) {
  const { rows } = await query(
    `SELECT id, course_slug, course_title, course_description, title, slug, sort_order, created_at
     FROM assignments
     WHERE course_slug = $1
     ORDER BY sort_order ASC, id ASC`,
    [courseSlug]
  );
  return rows;
}

/** One "course" view: title/description from first assignment + list of assignments */
export async function getCourseBySlug(courseSlug) {
  const assignments = await getAssignmentsByCourseSlug(courseSlug);
  if (assignments.length === 0) return null;
  const first = assignments[0];
  return {
    slug: first.course_slug,
    title: first.course_title,
    description: first.course_description ?? null,
    assignments: assignments.map(({ id, title, slug, sort_order, created_at }) => ({ id, title, slug, sort_order, created_at })),
  };
}

export async function getAssignmentBySlug(slug) {
  const { rows } = await query(
    `SELECT id, course_slug, course_title, course_description, title, slug, sort_order, created_at
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
  return rows;
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

/** Add an assignment. course_slug + course_title (and optional course_description) group it into a "course". */
export async function addAssignment({ course_slug, course_title, course_description, title, slug, sort_order = 0 }) {
  const { rows } = await query(
    `INSERT INTO assignments (course_slug, course_title, course_description, title, slug, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, course_slug, course_title, title, slug, sort_order, created_at`,
    [course_slug, course_title, course_description ?? null, title, slug, sort_order]
  );
  return rows[0];
}
