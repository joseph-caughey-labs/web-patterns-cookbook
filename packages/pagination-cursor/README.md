# pagination-cursor

Cursor-based pagination demo:
- API: `GET /items?cursor=<base64>`
- Response: `{ items, nextCursor }`
- Client helper: `fetchPage(baseUrl, cursor)`
