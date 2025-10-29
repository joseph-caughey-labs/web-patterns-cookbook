import type { Request, Response, NextFunction } from 'express';

export type Role = 'guest' | 'user' | 'admin';

export interface AuthedRequest extends Request {
  user?: { username: string; role: Role };
}

/** Attach a mock user to req if cookie 'session' exists. */
export function attachUser(req: AuthedRequest, _res: Response, next: NextFunction) {
  const cookie = req.headers.cookie || '';
  const m = /session=([^;]+)/.exec(cookie);
  if (m) {
    const [username, role] = decodeURIComponent(m[1]).split(':');
    req.user = { username, role: (role as Role) || 'user' };
  }
  next();
}

/** Ensure user exists and has at least one of required roles. */
export function requireRole(...roles: Role[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'unauthenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}
