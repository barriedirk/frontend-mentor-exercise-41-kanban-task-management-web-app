"use client";

import { useState } from "react";

import Image from "next/image";

export default function BoardHeaderMenuOptions() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="board-header__menu">
      <button
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="board-options-menu"
        aria-label="Board options"
        onClick={() => setOpen(true)}
      >
        <Image
          className="board-header__ellipsis object-fit w-0.75 h-4"
          src="/icon-vertical-ellipsis.svg"
          alt="options"
          width={3}
          height={16}
          priority
        />
      </button>
      {open && (
        <div
          className="board-header__menu-options-wrapper fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-4 top-18 bg-white rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ul
              id="board-header__menu-options"
              className="min-w-40 py-2 p-3 flex flex-col gap-2"
              role="menu"
              aria-controls="board-options-menu"
            >
              <li role="none">
                <button role="menuitem">Edit board</button>
              </li>
              <li role="none">
                <button role="menuitem">Delete board</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
