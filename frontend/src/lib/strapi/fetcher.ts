export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  try {
    const res = await fetch(input, {
      ...init,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Fetch failed: ${res.status} - ${text}`);
    }

    if (res.status === 204) {
      return {} as T;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : ({} as T);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw error;
      }
    }

    // Si es otro error de red, lo manejas normalmente
    throw error;
  }
}
