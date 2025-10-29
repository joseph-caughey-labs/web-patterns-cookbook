import express from 'express';
import { IdempotencyStore } from './store.js';

const app = express();
app.use(express.json());

const store = new IdempotencyStore<any>(5 * 60_000);

app.post('/webhook', async (req, res) => {
  const key = req.header('Idempotency-Key');
  if (!key) return res.status(400).json({ error: 'Idempotency-Key header required' });

  const cached = store.get(key);
  if (cached) return res.status(200).json({ ...cached, idempotent: true });

  // Simulate processing (e.g., verify signature, write to DB)
  const result = { received: req.body, processedAt: new Date().toISOString() };
  store.set(key, result);
  res.status(201).json({ ...result, idempotent: false });
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3002;
  app.listen(port, () => console.log(`webhooks-idempotency-retries on http://localhost:${port}`));
}

export default app;
