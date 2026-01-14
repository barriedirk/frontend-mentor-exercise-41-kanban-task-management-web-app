"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { signInSchema, type SignInValues } from "@/schemas/signIn";
import InputForm from "@/components/forms/fields/InputForm";

import { useFocusFirstInput } from "@/lib/hooks/useFocusFirstInput";

import { signinAction } from "./actions";

export default function SignInRoute() {
  const router = useRouter();
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInValues> = async (values) => {
    const toastId = toast.loading("Logging in...");

    const result = await signinAction(values);
    const data = await result.json();

    if (data?.success) {
      toast.success("Login success!", { id: toastId });
      router.push("/");
      return;
    }

    toast.error(data?.error ?? "Something went wrong", { id: toastId });
  };

  const loginWithDemoCredential = () => {
    onSubmit({
      email: "demo-devlinks-app@fakeemail.com",
      password: "3nT3rt#4inMen1",
    });
  };

  return (
    <div className="login">
      <h1
        id="login-heading"
        className="text-preset-2 md:text-preset-1 text-grey-900 mb-2.5"
      >
        Sign In
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
        <InputForm<SignInValues>
          name="email"
          control={control}
          label="Email Address"
          type="email"
          error={errors.email}
          autoComplete="email"
          placeholder="e.g. alex@email.com"
          dataTestid="email"
        />
        <InputForm<SignInValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
          placeholder="Enter your password"
          dataTestid="password"
        />
        <button
          data-testid="button-login-submit"
          className="btn--submit mt-5 button button--primary"
          type="submit"
          aria-label="Log in to your account"
          disabled={!isValid || isSubmitting}
        >
          Sign In
        </button>
      </form>

      <p className="text-preset-4 mt-3 flex justify-center items-center gap-2">
        <span className="text-white-custom">Don’t have an account?</span>
        <Link className="link underline" href="/signup" aria-label="Sign Up">
          Sign Up
        </Link>
      </p>

      <div className="text-preset-4 mt-3 flex justify-center items-center gap-2 text-white-custom">
        <span>Use</span>
        <button
          className="link underline"
          type="button"
          data-testid="button-login-demo-credentials"
          aria-label="Login with demo credentials"
          onClick={() => loginWithDemoCredential()}
        >
          Login Credentials
        </button>
        <span>to explore the demo.</span>
      </div>
    </div>
  );
}
