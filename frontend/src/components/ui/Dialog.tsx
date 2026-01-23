"use client";

import { ReactNode } from "react";

import clsx from "clsx";

interface DialogProps {
  title?: string;
  titleClassName?: string;
  children: ReactNode;
}

export default function Dialog({
  title,
  children,
  titleClassName,
}: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
      className="
        relative z-50
        w-full max-w-md
        rounded-xl
        bg-background
        p-6
        shadow-lg
        focus:outline-none
      "
    >
      {title && (
        <h2
          id="dialog-title"
          className={clsx("text-heading-l mb-4", titleClassName)}
        >
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}
