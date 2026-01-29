import { Router } from 'express';
import { listCoursesFromAssignments, getCourseBySlug, getCompletionsForUser, getAssignmentBySlug, recordCompletion, removeCompletion, hasCompleted } from '../db/assignments.js';

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

// Get completion status for one assignment (requires auth) — before /:slug
router.get('/assignments/:assignmentSlug/complete', async (req, res) => {
  if (!req.isAuthenticated || !req.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  try {
    const assignment = await getAssignmentBySlug(req.params.assignmentSlug);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    const completed = await hasCompleted(req.user.id, assignment.id);
    res.json({ completed });
  } catch (err) {
    console.error('Completion status error:', err);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

// Mark assignment complete (requires auth)
router.post('/assignments/:assignmentSlug/complete', async (req, res) => {
  if (!req.isAuthenticated || !req.user) {
    console.log('[complete] POST rejected: not authenticated');
    return res.status(401).json({ error: 'Not logged in' });
  }
  try {
    const assignment = await getAssignmentBySlug(req.params.assignmentSlug);
    if (!assignment) {
      console.log('[complete] Assignment not found:', req.params.assignmentSlug);
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await recordCompletion(req.user.id, assignment.id);
    console.log('[complete] Saved: user_id=%s assignment_id=%s (%s)', req.user.id, assignment.id, assignment.slug);
    res.json({ completed: true });
  } catch (err) {
    console.error('Record completion error:', err);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// Mark assignment not done (remove completion, requires auth) — POST to avoid proxy/DELETE issues
router.post('/assignments/:assignmentSlug/complete/undo', async (req, res) => {
  if (!req.isAuthenticated || !req.user) {
    console.log('[complete] undo POST rejected: not authenticated');
    return res.status(401).json({ error: 'Not logged in' });
  }
  try {
    const assignment = await getAssignmentBySlug(req.params.assignmentSlug);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await removeCompletion(req.user.id, assignment.id);
    console.log('[complete] Removed: user_id=%s assignment_id=%s (%s)', req.user.id, assignment.id, assignment.slug);
    res.json({ completed: false });
  } catch (err) {
    console.error('Remove completion error:', err);
    res.status(500).json({ error: 'Failed to update progress' });
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
