"use client";

import { ReactNode } from "react";

interface DialogProps {
  title?: string;
  children: ReactNode;
}

export default function Dialog({ title, children }: DialogProps) {
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
        <h2 id="dialog-title" className="text-heading-l text-foreground mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}
