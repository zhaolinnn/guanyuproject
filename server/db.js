import pg from 'pg';
import { USERS_TABLE, ASSIGNMENTS_TABLE, COMPLETIONS_TABLE } from './db/schema.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function initDb() {
  await query(USERS_TABLE);
  await query(ASSIGNMENTS_TABLE);
  await query(COMPLETIONS_TABLE);
  console.log('✓ Database ready (users, assignments, user_assignment_completions)');
}

export default pool;
