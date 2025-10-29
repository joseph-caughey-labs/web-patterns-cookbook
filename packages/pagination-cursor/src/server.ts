import express from 'express';
import { encodeCursor, decodeCursor, getPage } from './util.js';

const app = express();

const ITEMS = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

app.get('/items', (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 10, 25);
  const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
  const startIndex = cursor ? decodeCursor(cursor) : 0;
  const { slice, nextIndex } = getPage(ITEMS, startIndex, limit);
  const nextCursor = nextIndex < ITEMS.length ? encodeCursor(nextIndex) : undefined;
  res.json({ items: slice, nextCursor });
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3003;
  app.listen(port, () => console.log(`pagination-cursor on http://localhost:${port}`));
}

export default app;
