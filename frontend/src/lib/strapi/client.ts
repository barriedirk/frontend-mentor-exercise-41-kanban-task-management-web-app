import { fetcher } from "./fetcher";

const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

interface StrapiOptions extends RequestInit {
  token?: string;
}

export function strapiFetch<T>(endpoint: string, options?: StrapiOptions) {
  const authToken = options?.token || STRAPI_TOKEN;
  const { token, headers, ...restOfOptions } = options || {};

  return fetcher<T>(`${NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`, {
    ...restOfOptions,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}
