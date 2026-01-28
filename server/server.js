import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { initDb } from './db.js';
import './passport.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: allow credentials (cookies) from frontend
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Session (must come before passport and routes)
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});
app.use('/api/auth', authRoutes);

// Start server (init DB first)
initDb()
  .then(() => {
    const dbUrl = process.env.DATABASE_URL || '';
    const dbMatch = dbUrl.match(/\/([^/?]+)(\?|$)/);
    const dbName = dbMatch ? dbMatch[1] : '(check DATABASE_URL)';
    app.listen(PORT, () => {
      console.log(`✓ Using database: ${dbName}`);
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database init failed:', err.message);
    console.error('Set DATABASE_URL in server/.env (e.g. postgresql://localhost:5432/guanyu) and ensure Postgres is running.');
    process.exit(1);
  });
