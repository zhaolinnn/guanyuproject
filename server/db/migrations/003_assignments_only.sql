-- Simplify to assignments-only: no courses table.
-- Run after 002 if you had courses. Or run on fresh DB that had old assignments (no course_slug).
-- Usage: psql -d guanyu -f server/db/migrations/003_assignments_only.sql

-- Add new columns to assignments (if not present)
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS course_slug VARCHAR(255);
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS course_title VARCHAR(500);
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS course_description TEXT;

-- Backfill from courses table if it exists (optional)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'courses') THEN
    UPDATE assignments a
    SET course_slug = c.slug, course_title = c.title, course_description = c.description
    FROM courses c
    WHERE a.course_id = c.id;
  END IF;
EXCEPTION WHEN undefined_column THEN NULL;
END $$;

-- If no course_id column, set defaults for any existing rows
UPDATE assignments SET course_slug = 'pinyin', course_title = 'Pinyin', course_description = 'Learn Pinyin.'
WHERE course_slug IS NULL OR course_slug = '';

ALTER TABLE assignments ALTER COLUMN course_slug SET NOT NULL;
ALTER TABLE assignments ALTER COLUMN course_title SET NOT NULL;

-- Drop FK to courses then drop course_id column if it exists
ALTER TABLE assignments DROP CONSTRAINT IF EXISTS assignments_course_id_fkey;
ALTER TABLE assignments DROP COLUMN IF EXISTS course_id;

-- Drop courses table if it exists
DROP TABLE IF EXISTS courses;
