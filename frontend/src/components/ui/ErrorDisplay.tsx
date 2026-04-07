import clsx from "clsx";
import Button from "./Button";

interface ErrorDisplayProps {
  title: string;
  description: string;
  onReset: () => void;
  showHardRefresh?: boolean;
  isColdStart?: boolean;
}

export function ErrorDisplay({
  title,
  description,
  onReset,
  showHardRefresh,
  isColdStart,
}: ErrorDisplayProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center",
        "justify-center",
        "min-h-[60vh] p-6 text-center",
      )}
    >
      <h2 className="text-heading-xl text-2xl font-bold text-grey-900 mb-4">
        {title}
      </h2>
      <p className="text-heading-m text-grey-700 max-w-md mb-8">
        {description}
      </p>

      <div className="flex gap-4">
        <Button
          className="text-preset-4"
          variant="destructive"
          onClick={onReset}
        >
          Try Again
        </Button>
        {showHardRefresh && (
          <Button
            className="text-preset-4"
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        )}
      </div>

      {isColdStart && (
        <p className="mt-4 text-xs text-grey-500 italic">
          Tip: The server is in power saving mode and is waking up.
        </p>
      )}
    </div>
  );
}
