"use server";

import { cookies } from "next/headers"; // Importante
import { signupUser } from "@/features/auth/services/auth.service";
import { signUpSchema } from "@/schemas/signUp";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

export async function signupAction(values: unknown) {
  const parsed = signUpSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { email, password } = parsed.data;

  try {
    const { jwt } = await signupUser({
      email,
      password,
      username: email,
    });

    const cookieStore = await cookies();
    cookieStore.set("auth_token", jwt, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
