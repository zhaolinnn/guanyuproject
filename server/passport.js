import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { query } from './db.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const usernameTrimmed = String(username).trim();
      const { rows } = await query(
        'SELECT id, username, password_hash, email, name, created_at FROM users WHERE username = $1',
        [usernameTrimmed]
      );
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      const ok = await bcrypt.compare(String(password), user.password_hash);
      if (!ok) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      const { password_hash, ...safe } = user;
      return done(null, safe);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await query(
      'SELECT id, username, email, name, created_at FROM users WHERE id = $1',
      [id]
    );
    done(null, rows[0] || null);
  } catch (err) {
    done(err);
  }
});
