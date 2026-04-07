"use client";

import Button from "../components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-heading-xl text-2xl font-bold text-grey-900 mb-4">
            Something went very wrong on a global level.
          </h2>
          <Button
            className="text-preset-4"
            variant="secondary"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
