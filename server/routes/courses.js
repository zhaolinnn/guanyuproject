import { Router } from 'express';
import { listCoursesFromAssignments, getCourseBySlug, getCompletionsForUser } from '../db/assignments.js';

const router = Router();

// List all courses (derived from assignments: one per course_slug)
router.get('/', async (req, res) => {
  try {
    const courses = await listCoursesFromAssignments();
    res.json({ courses });
  } catch (err) {
    console.error('Courses error:', err);
    res.json({ courses: [] });
  }
});

// Get user's completions (requires auth) — must be before /:slug
router.get('/completions', async (req, res) => {
  if (!req.isAuthenticated || !req.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  try {
    const completions = await getCompletionsForUser(req.user.id);
    res.json({ completions });
  } catch (err) {
    console.error('Completions error:', err);
    res.status(500).json({ error: 'Failed to load completions' });
  }
});

// Get one course by slug with its assignments (from assignments table)
router.get('/:slug', async (req, res) => {
  try {
    const course = await getCourseBySlug(req.params.slug);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ course });
  } catch (err) {
    console.error('Course error:', err);
    res.status(500).json({ error: 'Failed to load course' });
  }
});

export default router;
