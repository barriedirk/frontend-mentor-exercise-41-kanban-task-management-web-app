"use client";

import { ReactNode } from "react";
import Overlay from "./Overlay";
import Dialog from "./Dialog";
import Portal from "./Portal";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <Portal>
      <Overlay onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <Dialog title={title}>{children}</Dialog>
        </div>
      </Overlay>
    </Portal>
  );
}
