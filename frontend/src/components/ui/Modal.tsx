"use client";

import { ReactNode } from "react";
import Overlay from "./Overlay";
import Dialog from "./Dialog";
import Portal from "./Portal";
import clsx from "clsx";
import { SubMenuItem } from "@/features/board/types/sub-menu-item";

interface ModalProps {
  open: boolean;
  title?: string;
  titleClassName?: string;
  onClose: () => void;
  children: ReactNode;
  titleId?: string;
  subMenus?: SubMenuItem[];
  size?: "small" | "large" | null;
}

export default function Modal({
  open,
  title,
  titleId,
  titleClassName,
  onClose,
  children,
  subMenus,
  size = "small",
}: ModalProps) {
  if (!open) return null;

  return (
    <Portal>
      <Overlay onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            "w-full max-w-120 mx-auto",
            !size && "max-w-md",
            size === "small" && "max-w-md",
            size === "large" && "max-w-120",
          )}
        >
          <Dialog
            title={title}
            titleClassName={titleClassName}
            titleId={titleId}
            subMenus={subMenus}
          >
            {children}
          </Dialog>
        </div>
      </Overlay>
    </Portal>
  );
}
