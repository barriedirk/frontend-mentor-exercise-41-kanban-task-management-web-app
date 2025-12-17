"use server";

import { cookies } from "next/headers";

import { signinUser } from "@/features/auth/services/auth.service";
import { signInSchema } from "@/schemas/signIn";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

export async function signinAction(
  values: unknown
): Promise<{ success?: true; error?: string }> {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { email, password } = parsed.data;

  try {
    const { jwt } = await signinUser({
      identifier: email,
      password,
    });

    const cookieStore: ReturnType<typeof cookies> = cookies();

    cookieStore.set({
      name: "auth_token",
      value: jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}
