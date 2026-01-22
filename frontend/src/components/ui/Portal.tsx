"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export default function Portal({
  children,
  containerId = "modal-root",
}: PortalProps) {
  if (typeof window === "undefined") return null;

  const container = document.getElementById(containerId);
  if (!container) return null;

  return createPortal(children, container);
}
