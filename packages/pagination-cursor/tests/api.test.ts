import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';
import { encodeCursor } from '../src/util.js';

describe('pagination-cursor', () => {
  it('returns first page and cursor', async () => {
    const res = await request(app).get('/items').query({ limit: 5 });
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(5);
    expect(res.body.nextCursor).toBeDefined();
  });

  it('uses cursor to get next page', async () => {
    const first = await request(app).get('/items').query({ limit: 5 });
    const c = first.body.nextCursor;
    const second = await request(app).get('/items').query({ limit: 5, cursor: c });
    expect(second.body.items[0].id).toBe(6);
  });

  it('handles bad cursor gracefully', async () => {
    const res = await request(app).get('/items').query({ cursor: 'notbase64' });
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('last page has no nextCursor', async () => {
    const nearEnd = await request(app).get('/items').query({ cursor: encodeCursor(95), limit: 10 });
    expect(nearEnd.body.nextCursor).toBeUndefined();
  });
});
