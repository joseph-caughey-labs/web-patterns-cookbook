export async function fetchPage(baseUrl: string, cursor?: string): Promise<{ items: any[]; nextCursor?: string }>
{
  const url = new URL('/items', baseUrl);
  if (cursor) url.searchParams.set('cursor', cursor);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
