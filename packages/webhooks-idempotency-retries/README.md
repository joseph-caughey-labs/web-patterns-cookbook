# webhooks-idempotency-retries

Demonstrates safe webhook ingestion:
- Require `Idempotency-Key` header
- Deduplicate repeated deliveries (store key → result)
- Return the same response for duplicates (idempotent)
- (Stub) Backoff strategy notes in docs

For real systems, persist to Redis/DB with TTL.
