# Database tables and assignments

## Tables

- **users** — `id`, `username` (unique), `password_hash`, `created_at`, `email` (optional), `name` (optional)
- **assignments** — `id`, `title`, `slug` (unique), `sort_order`, `created_at` — defines each assignment/lesson
- **user_assignment_completions** — `user_id`, `assignment_id`, `completed_at` — which user did which assignment (primary key `(user_id, assignment_id)`)

## How to add new assignments

1. **Insert into `assignments`** so the app knows the assignment exists:

   ```sql
   INSERT INTO assignments (title, slug, sort_order)
   VALUES ('Lesson 1: Greetings', 'lesson-1-greetings', 1);
   ```

   Or use the helper in code:

   ```js
   import { addAssignment } from './db/assignments.js';
   await addAssignment({ title: 'Lesson 1: Greetings', slug: 'lesson-1-greetings', sort_order: 1 });
   ```

2. **Completions** — when a user finishes an assignment, insert (or upsert) into `user_assignment_completions`:

   ```js
   import { recordCompletion } from './db/assignments.js';
   await recordCompletion(userId, assignmentId);
   ```

   To check if a user has done an assignment:

   ```js
   import { hasCompleted, getCompletionsForUser } from './db/assignments.js';
   const done = await hasCompleted(userId, assignmentId);
   const allDone = await getCompletionsForUser(userId); // { assignment_id, completed_at }[]
   ```

3. **Order** — Use `sort_order` on `assignments` to control the order (e.g. 1, 2, 3…). The app can list assignments by `sort_order` and show completion per user.

## Migrating from the old users table (email-only)

If you already have a `users` table with only `email` (no `username`), run the migration in `migrations/001_username_and_assignments.sql` once, then start the server as usual.
