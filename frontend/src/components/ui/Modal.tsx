"use client";

import { ReactNode } from "react";
import Overlay from "./Overlay";
import Dialog from "./Dialog";
import Portal from "./Portal";

interface ModalProps {
  open: boolean;
  title?: string;
  titleClassName?: string;
  onClose: () => void;
  children: ReactNode;
  titleId?: string;
  size?: "small" | "large" | null;
}

export default function Modal({
  open,
  title,
  titleId,
  titleClassName,
  onClose,
  children,
  size,
}: ModalProps) {
  if (!open) return null;

  return (
    <Portal>
      <Overlay onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <Dialog
            title={title}
            titleClassName={titleClassName}
            titleId={titleId}
            size={size}
          >
            {children}
          </Dialog>
        </div>
      </Overlay>
    </Portal>
  );
}
