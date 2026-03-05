"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { SubMenuItem } from "@/features/board/types/sub-menu-item";

interface DialogProps {
  titleId?: string;
  title?: string;
  titleClassName?: string;
  children: ReactNode;
  subMenus?: SubMenuItem[];
}

export default function Dialog({
  titleId = "dialog-title",
  title,
  children,
  titleClassName,
  subMenus,
}: DialogProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const iconKebab: string = "/icon-vertical-ellipsis.svg";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={clsx(
        "relative z-50 rounded-xl bg-background p-6 shadow-lg focus:outline-none w-full",
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

      {subMenus && subMenus.length > 0 && (
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={openMenu}
            onClick={() => setOpenMenu((prev) => !prev)}
            className="p-2 rounded-md hover:bg-muted transition"
          >
            <Image src={iconKebab} alt="menu" width={16} height={16} priority />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-xl border z-50">
              {subMenus.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    item.onClick();
                    setOpenMenu(false);
                  }}
                  className={clsx(
                    "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition",
                    item.className,
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
