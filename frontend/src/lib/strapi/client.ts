import { fetcher } from "./fetcher";

const STRAPI_URL = process.env.STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

export function strapiFetch<T>(endpoint: string, options?: RequestInit) {
  return fetcher<T>(`${STRAPI_URL}/api/${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}
