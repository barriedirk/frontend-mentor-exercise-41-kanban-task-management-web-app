import { fetcher } from "./fetcher";

const STRAPI_URL = process.env.STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

interface StrapiOptions extends RequestInit {
  token?: string;
}

export function strapiFetch<T>(endpoint: string, options?: StrapiOptions) {
  const authToken = options?.token || STRAPI_TOKEN;

  return fetcher<T>(`${STRAPI_URL}/api/${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}
