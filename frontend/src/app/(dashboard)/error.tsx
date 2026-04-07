"use client";

import { useEffect } from "react";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { useErrorType } from "@/lib/hooks/useErrorType";
import clsx from "clsx";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isColdStart } = useErrorType(error);
  useEffect(() => {
    console.error("Dashboard Crash:", error);
  }, [error]);

  return (
    <>
      <div
        className={clsx(
          "flex flex-col justify-center",
          "min-h-[60vh] p-6 text-center",
        )}
      >
        <ErrorDisplay
          title="Backend is taking a nap"
          description="It seems our server (Strapi) is experiencing a **Cold Start**. This
        happens in free/shared tiers when the service hasn't been used for
        a while."
          showHardRefresh={true}
          onReset={() => reset()}
          isColdStart={isColdStart}
        />

        <p className="mt-6 text-sm text-grey-500 italic">
          (Internal Error: {error.message || "500 Internal Server Error"})
        </p>
      </div>
    </>
  );
}
