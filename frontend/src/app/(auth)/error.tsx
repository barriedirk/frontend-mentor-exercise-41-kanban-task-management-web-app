"use client";

import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { useErrorType } from "@/lib/hooks/useErrorType";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isColdStart } = useErrorType(error);

  return (
    <ErrorDisplay
      title="Access temporarily unavailable"
      description={
        isColdStart
          ? "The authentication server is starting up."
          : "There was an error validating your data."
      }
      showHardRefresh={true}
      onReset={reset}
      isColdStart={isColdStart}
    />
  );
}
