import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { query } from '../db.js';

const router = Router();

// Login (Passport local strategy)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Login failed' });
    }
    if (!user) {
      return res.status(401).json({ error: info?.message || 'Incorrect username or password' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: 'Login failed' });
      }
      const { id, username, email, name, created_at } = user;
      return res.json({ user: { id, username, email, name, created_at } });
    });
  })(req, res, next);
});

// Current user (requires session)
router.get('/me', (req, res) => {
  if (!req.isAuthenticated || !req.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { id, username, email, name, created_at } = req.user;
  res.json({ user: { id, username, email, name, created_at } });
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  });
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const usernameTrimmed = String(username).trim();
    if (!usernameTrimmed) {
      return res.status(400).json({ error: 'Username is required' });
    }

    if (usernameTrimmed.length < 2) {
      return res.status(400).json({ error: 'Username must be at least 2 characters' });
    }

    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const password_hash = await bcrypt.hash(String(password), 10);
    const emailVal = email ? String(email).trim().toLowerCase() || null : null;
    const nameVal = name ? String(name).trim() || null : null;

    const { rows } = await query(
      `INSERT INTO users (username, password_hash, email, name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, name, created_at`,
      [usernameTrimmed, password_hash, emailVal, nameVal]
    );

    const user = rows[0];
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
      message: 'Account created',
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'That username is already taken' });
    }
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

export default router;
