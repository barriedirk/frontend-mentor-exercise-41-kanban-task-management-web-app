export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch failed: ${res.status} - ${text}`);
  }

  return res.json();
}
