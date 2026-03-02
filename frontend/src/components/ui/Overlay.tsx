"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface OverlayProps {
  onClick?: () => void;
  children?: ReactNode;
}

export default function Overlay({ onClick, children }: OverlayProps) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-40 bg-black/50  backdrop-blur-[2px] flex items-center justify-center",
      )}
      onClick={onClick}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
