"use client";

import { useState } from "react";

import Image from "next/image";

import DeleteBoardFeature from "@/features/board/components/DeleteBoardFeature";

import EditBoardFeature from "@/features/board/components/EditBoardFeature";
import { BoardModel } from "@/features/board/types/board.types";

const boardMockup: BoardModel = {
  id: "232",
  name: "Platform Launch",
  shareToken: null,
  shareMode: null,
  columns: [
    { id: "0", name: "TODO", position: 0 },
    { id: "1", name: "DOING", position: 1 },
    { id: "2", name: "DONE", position: 2 },
  ],
};

export default function BoardHeaderMenuOptions() {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const openModal = (modal: "delete" | "edit") => {
    setOpenDeleteModal(modal === "delete");
    setOpenEditModal(modal === "edit");

    setOpen(false);
  };

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
      {openEditModal && (
        <EditBoardFeature board={boardMockup} open={true} onClose={() => {}} />
      )}
      {openDeleteModal && (
        <DeleteBoardFeature
          boardId={boardMockup.id!}
          boardName={boardMockup.name}
          open={true}
          onClose={() => {}}
        />
      )}
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
              className="min-w-40 py-2 p-3 flex flex-col gap-2 text-dark-grey"
              role="menu"
              aria-controls="board-options-menu"
            >
              <li role="none">
                <button role="menuitem" onClick={() => openModal("edit")}>
                  Edit board
                </button>
              </li>
              <li role="none">
                <button role="menuitem" onClick={() => openModal("delete")}>
                  Delete board
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
