"use server";

import { cookies } from "next/headers";
import { signinUser } from "@/features/auth/services/auth.service";
import { signInSchema } from "@/schemas/signIn";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

export async function signinAction(values: unknown) {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Datos inválidos",
      fields: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  try {
    const { jwt } = await signinUser({
      identifier: email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set("auth_token", jwt, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
