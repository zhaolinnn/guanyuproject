/**
 * List all assignment completions from the DB (for debugging).
 * Run from server dir: node db/list-completions.js
 * Requires: DATABASE_URL in server/.env
 */
import 'dotenv/config';
import { query } from '../db.js';

async function list() {
  const { rows } = await query(`
    SELECT uac.user_id, uac.assignment_id, uac.completed_at,
           u.username,
           a.slug AS assignment_slug, a.title AS assignment_title
    FROM user_assignment_completions uac
    JOIN users u ON u.id = uac.user_id
    JOIN assignments a ON a.id = uac.assignment_id
    ORDER BY uac.completed_at DESC
  `);
  if (rows.length === 0) {
    console.log('No completions in DB yet.');
    return;
  }
  console.log('Completions in DB:');
  console.table(rows.map((r) => ({
    user_id: r.user_id,
    username: r.username,
    assignment_slug: r.assignment_slug,
    assignment_title: r.assignment_title,
    completed_at: r.completed_at?.toISOString?.() ?? r.completed_at,
  })));
}

list().catch((err) => {
  console.error(err);
  process.exit(1);
}).finally(() => process.exit(0));
