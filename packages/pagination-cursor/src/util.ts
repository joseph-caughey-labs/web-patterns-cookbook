export function encodeCursor(index: number): string {
  return Buffer.from(String(index), 'utf8').toString('base64url');
}

export function decodeCursor(cursor: string): number {
  try {
    const s = Buffer.from(cursor, 'base64url').toString('utf8');
    const n = Number(s);
    if (!Number.isFinite(n) || n < 0) return 0;
    return n;
  } catch {
    return 0;
  }
}

export function getPage<T>(arr: T[], start: number, limit: number): { slice: T[]; nextIndex: number } {
  const end = Math.min(start + limit, arr.length);
  return { slice: arr.slice(start, end), nextIndex: end };
}
