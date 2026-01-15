import Logo from "@/components/kanban/Logo";

import Link from "next/link";

export default function NotFoundRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-between gap-7">
        <Logo />
        <h1>This page doesn’t exist.</h1>
        <div>
          <p className="text-preset-4 mt-3 flex justify-center items-center gap-2">
            <Link className="link underline" href="/" aria-label="Back Home">
              Go back home
            </Link>
          </p>

          <p className="text-preset-4 mt-3 flex justify-center items-center gap-2">
            <span className="text-white-custom">You have an account?</span>
            <Link
              className="link underline"
              href="/signin"
              aria-label="Sign Up"
            >
              Sign In
            </Link>
          </p>
          <p className="text-preset-4 mt-3 flex justify-center items-center gap-2">
            <span className="text-white-custom">Don’t have an account?</span>
            <Link
              className="link underline"
              href="/signup"
              aria-label="Sign Up"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
