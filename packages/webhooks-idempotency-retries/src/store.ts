/** In-memory idempotency store with TTL */
export class IdempotencyStore<T = unknown> {
  private map = new Map<string, { value: T; expires: number }>();
  constructor(private ttlMs = 10 * 60_000) {}

  get(key: string): T | undefined {
    const rec = this.map.get(key);
    if (!rec) return undefined;
    if (Date.now() > rec.expires) {
      this.map.delete(key);
      return undefined;
    }
    return rec.value;
  }

  set(key: string, value: T) {
    this.map.set(key, { value, expires: Date.now() + this.ttlMs });
  }
}
