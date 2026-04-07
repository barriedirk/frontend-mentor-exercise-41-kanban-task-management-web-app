export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  try {
    const res = await fetch(input, {
      ...init,
    });

    if (!res.ok) {
      if (res.status >= 500) {
        throw new Error("SERVER_UNDER_MAINTENANCE");
      }

      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();

        throw new Error(errorData?.error?.message || `Error ${res.status}`);
      }

      throw new Error(`Fetch failed: ${res.status}`);
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
