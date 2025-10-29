import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';

describe('webhooks idempotency', () => {
  it('requires header', async () => {
    const res = await request(app).post('/webhook').send({ x: 1 });
    expect(res.status).toBe(400);
  });

  it('creates then deduplicates', async () => {
    const key = 'abc-123';
    const first = await request(app).post('/webhook').set('Idempotency-Key', key).send({ a: 1 });
    expect(first.status).toBe(201);
    const second = await request(app).post('/webhook').set('Idempotency-Key', key).send({ a: 1 });
    expect(second.status).toBe(200);
    expect(second.body.idempotent).toBe(true);
    expect(second.body.processedAt).toBe(first.body.processedAt);
  });
});
