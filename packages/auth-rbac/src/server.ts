import express from 'express';
import cookieParser from 'cookie-parser';
import { attachUser, requireRole, type AuthedRequest } from './rbac.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

// Mock login: sets cookie "session=username:role"
app.post('/login', (req, res) => {
  const { username, role } = req.body || {};
  if (!username) return res.status(400).json({ error: 'username required' });
  const r = role === 'admin' ? 'admin' : 'user';
  res.cookie('session', encodeURIComponent(`${username}:${r}`), { httpOnly: true, sameSite: 'lax' });
  res.json({ ok: true, role: r });
});

app.get('/profile', requireRole('user', 'admin'), (req: AuthedRequest, res) => {
  res.json({ user: req.user });
});

app.get('/admin', requireRole('admin'), (_req, res) => {
  res.json({ secret: 'swordfish' });
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`auth-rbac on http://localhost:${port}`));
}

export default app;
