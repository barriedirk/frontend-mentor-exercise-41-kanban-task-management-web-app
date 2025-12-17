"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { signUpSchema, type SignUpValues } from "@/schemas/signUp";
import InputForm from "@/components/forms/fields/InputForm";
import { useFocusFirstInput } from "@/lib/hooks/useFocusFirstInput";
import { signupAction } from "./actions";

export default function SignUpRoute() {
  const router = useRouter();
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpValues> = async (values) => {
    const toastId = toast.loading("Creating account...");
    const result = await signupAction(values);

    if (result?.success) {
      toast.success("Account created!", { id: toastId });
      router.push("/");
      return;
    }

    toast.error(result?.error ?? "Something went wrong", { id: toastId });
  };

  return (
    <div className="signup">
      <h1
        id="signup-heading"
        className="text-preset-2 md:text-preset-1 text-grey-900 mb-2.5"
      >
        Sign Up
      </h1>
      <p className="text-preset-3-regular text-grey-500 mb-10">
        Add your details below to get back into the app
      </p>
      <form
        className="flex flex-col gap-5"
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="login-heading"
      >
        <InputForm<SignUpValues>
          name="email"
          control={control}
          label="Email Address"
          type="email"
          error={errors.email}
          autoComplete="email"
          placeholder="e.g. alex@email.com"
          dataTestid="email"
        />
        <InputForm<SignUpValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
          placeholder="Enter your password"
          dataTestid="password"
        />
        <InputForm<SignUpValues>
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          error={errors.password}
          autoComplete="confirmPassword"
          placeholder="Enter your password"
          dataTestid="confirmPassword"
        />
        <button
          data-testid="button-login-submit"
          className="btn--submit mt-5 button button--primary"
          type="submit"
          aria-label="Create an account"
          disabled={!isValid || isSubmitting}
        >
          Sign Up
        </button>
      </form>

      <p className="text-preset-4 mt-3 flex justify-center items-center gap-2">
        <span className="text-white-custom">You have an account?</span>
        <Link className="link" href="/signin" aria-label="Sign Up">
          Sign In
        </Link>
      </p>
    </div>
  );
}
