"use server";

import { signinUser } from "@/features/auth/services/auth.service";
import { signInSchema } from "@/schemas/signIn";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

export async function signinAction(values: unknown): Promise<Response> {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, password } = parsed.data;

  try {
    const { jwt } = await signinUser({
      identifier: email,
      password,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `auth_token=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
