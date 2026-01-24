"use client";

import { ReactNode } from "react";

import clsx from "clsx";

interface DialogProps {
  titleId?: string;
  title?: string;
  titleClassName?: string;
  children: ReactNode;
  size?: "small" | "large" | null;
}

export default function Dialog({
  titleId = "dialog-title",
  title,
  children,
  titleClassName,
  size = "small",
}: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={clsx(
        "relative z-50 w-full max-w-md rounded-xl bg-background p-6 shadow-lg focus:outline-none",
        !size && "max-w-md",
        size === "small" && "max-w-md",
        size === "large" && "max-w-120",
      )}
    >
      {title && (
        <h2
          id={titleId}
          className={clsx("text-heading-l mb-4", titleClassName)}
        >
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}
