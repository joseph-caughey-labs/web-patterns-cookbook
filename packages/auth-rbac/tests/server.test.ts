import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';

describe('auth-rbac', () => {
  it('rejects unauthenticated profile', async () => {
    const res = await request(app).get('/profile');
    expect(res.status).toBe(401);
  });

  it('allows user profile after login', async () => {
    const login = await request(app).post('/login').send({ username: 'joey', role: 'user' });
    const cookie = login.headers['set-cookie'][0];
    const res = await request(app).get('/profile').set('Cookie', cookie);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('joey');
  });

  it('forbids user from /admin', async () => {
    const login = await request(app).post('/login').send({ username: 'joey', role: 'user' });
    const cookie = login.headers['set-cookie'][0];
    const res = await request(app).get('/admin').set('Cookie', cookie);
    expect(res.status).toBe(403);
  });

  it('allows admin to /admin', async () => {
    const login = await request(app).post('/login').send({ username: 'root', role: 'admin' });
    const cookie = login.headers['set-cookie'][0];
    const res = await request(app).get('/admin').set('Cookie', cookie);
    expect(res.status).toBe(200);
    expect(res.body.secret).toBe('swordfish');
  });
});
