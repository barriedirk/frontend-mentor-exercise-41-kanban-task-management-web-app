import { fetcher } from "@/lib/strapi/fetcher";
import {
  type SigninPayload,
  type SigninResponse,
  type SignupPayload,
} from "../types/auth.types";

const STRAPI_URL = process.env.STRAPI_URL!;

export async function signupUser(payload: SignupPayload) {
  return fetcher(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function signinUser(
  payload: SigninPayload
): Promise<SigninResponse> {
  return fetcher(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
