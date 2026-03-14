"use server";

import { signupUser } from "@/features/auth/services/auth.service";
import { signUpSchema } from "@/schemas/signUp";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

export async function signupAction(
  values: unknown
): Promise<{ success?: true; error?: string }> {
  const parsed = signUpSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { email, password } = parsed.data;

  try {
    await signupUser({
      email,
      password,
      username: email, // Strapi requires username
    });

    return { success: true };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}
