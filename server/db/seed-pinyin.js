/**
 * Seed the Pinyin course as assignments (no courses table).
 * Run once: cd server && npm run seed
 * Requires: DATABASE_URL in server/.env, assignments table with course_slug, course_title, course_description.
 */
import 'dotenv/config';
import { getAssignmentsByCourseSlug } from './assignments.js';
import { addAssignment } from './assignments.js';

const PINYIN_COURSE = {
  course_slug: 'pinyin',
  course_title: 'Pinyin',
  course_description: 'Learn the romanization system for Mandarin Chinese. Master initials, finals, and tones.',
};

const ASSIGNMENTS = [
  { title: 'Introduction to Pinyin', slug: 'pinyin-intro', sort_order: 1 },
  { title: 'Initials (Consonants)', slug: 'pinyin-initials', sort_order: 2 },
  { title: 'Finals (Vowels)', slug: 'pinyin-finals', sort_order: 3 },
  { title: 'The Four Tones', slug: 'pinyin-tones', sort_order: 4 },
  { title: 'Syllables and Spelling Rules', slug: 'pinyin-syllables', sort_order: 5 },
];

async function seed() {
  const existing = await getAssignmentsByCourseSlug(PINYIN_COURSE.course_slug);
  if (existing.length > 0) {
    console.log('Pinyin assignments already exist. Skipping seed.');
    process.exit(0);
  }

  for (const a of ASSIGNMENTS) {
    await addAssignment({
      ...PINYIN_COURSE,
      title: a.title,
      slug: a.slug,
      sort_order: a.sort_order,
    });
  }

  console.log('✓ Pinyin course and', ASSIGNMENTS.length, 'assignments created.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
