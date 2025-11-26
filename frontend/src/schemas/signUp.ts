import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Invalid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 6 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords are different",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
