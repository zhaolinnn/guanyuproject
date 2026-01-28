import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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
