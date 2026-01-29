# Database: users, assignments, completions (no courses table)

## Tables

- **users** — `id`, `username`, `password_hash`, `created_at`, `email`, `name`
- **assignments** — `id`, `course_slug`, `course_title`, `course_description`, `title`, `slug` (unique), `sort_order`, `created_at`  
  "Courses" are just groupings: same `course_slug` + `course_title` on multiple assignments.
- **user_assignment_completions** — `user_id`, `assignment_id`, `completed_at` — how many assignments a user completed (per course = count where assignment.course_slug = X).

## How to add a course and its assignments

1. **Insert assignments** with the same `course_slug` and `course_title` (and optional `course_description`):

   ```sql
   INSERT INTO assignments (course_slug, course_title, course_description, title, slug, sort_order)
   VALUES ('pinyin', 'Pinyin', 'Learn the romanization system for Mandarin.', 'Introduction to Pinyin', 'pinyin-intro', 1);
   ```

   Or use `addAssignment({ course_slug, course_title, course_description, title, slug, sort_order })` from `db/assignments.js`.

2. **Seed Pinyin** (one-time): From the `server/` directory:

   ```bash
   cd server && npm run seed
   ```

   This inserts 5 Pinyin assignments (intro, initials, finals, tones, syllables). The app derives the "Pinyin" course from them.

## Migrations

- **001** — Old users (email-only): run `migrations/001_username_and_assignments.sql`.
- **002** — Old schema with courses table: run `migrations/002_courses_table.sql` if you had it.
- **003** — Simplify to assignments-only (no courses table): run `migrations/003_assignments_only.sql`, then run the seed.
