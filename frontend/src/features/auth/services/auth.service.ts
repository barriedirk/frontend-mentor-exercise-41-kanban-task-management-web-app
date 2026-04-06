import { fetcher } from "@/lib/strapi/fetcher";
import {
  type SigninPayload,
  type AuthResponse,
  type SignupPayload,
} from "../types/auth.types";

const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function signupUser(
  payload: SignupPayload,
): Promise<AuthResponse> {
  return fetcher<AuthResponse>(
    `${NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
}

export async function signinUser(
  payload: SigninPayload,
): Promise<AuthResponse> {
  return fetcher<AuthResponse>(`${NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
