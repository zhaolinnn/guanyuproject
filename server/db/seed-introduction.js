/**
 * Seed the Introduction course.
 * Run: cd server && npm run seed-introduction
 * Requires: DATABASE_URL in server/.env.
 */
import 'dotenv/config';
import { getAssignmentsByCourseSlug, addAssignment } from './assignments.js';

const INTRODUCTION_COURSE = {
  course_slug: 'introduction',
  course_title: 'Introduction',
  course_description: "Get into the correct mindset of learning 'the hardest language to learn for English speakers'",
};

const ASSIGNMENTS = [
  { title: 'Getting Started', slug: 'introduction-getting-started', sort_order: 1 },
];

async function seed() {
  const existing = await getAssignmentsByCourseSlug(INTRODUCTION_COURSE.course_slug);
  if (existing.length > 0) {
    console.log('Introduction course already exists. Skipping seed.');
    process.exit(0);
  }

  for (const a of ASSIGNMENTS) {
    await addAssignment({
      ...INTRODUCTION_COURSE,
      title: a.title,
      slug: a.slug,
      sort_order: a.sort_order,
    });
  }

  console.log('✓ Introduction course and', ASSIGNMENTS.length, 'assignment(s) created.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
