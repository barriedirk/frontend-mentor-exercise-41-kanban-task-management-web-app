"use client";

import Image from "next/image";

import { useBoardMenuActions } from "../hooks/useBoardHeaderActions";
import { BoardHeaderMenuOptions } from "./BoardHeaderMenuOptions";
import DeleteBoardFeature from "@/features/board/components/DeleteBoardFeature";
import EditBoardFeature from "@/features/board/components/EditBoardFeature";

export default function BoardHeaderMenu() {
  const {
    activeBoard,
    isMenuOpen,
    setIsMenuOpen,
    activeModal,
    openModal,
    closeModal,
  } = useBoardMenuActions();

  if (!activeBoard) {
    return (
      <div className="board-header__menu">
        <p className="text-body-l text-foreground">
          Please, select a board first.
        </p>
      </div>
    );
  }

  return (
    <div className="board-header__menu">
      <button onClick={() => setIsMenuOpen(true)} aria-label="Board options">
        <Image
          className="board-header__ellipsis object-fit w-0.75 h-4"
          src="/icon-vertical-ellipsis.svg"
          alt="options"
          width={3}
          height={16}
          priority
        />
      </button>

      {isMenuOpen && (
        <BoardHeaderMenuOptions
          onEdit={() => openModal("edit")}
          onDelete={() => openModal("delete")}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      {activeModal === "edit" && (
        <EditBoardFeature
          board={activeBoard}
          open={true}
          onClose={closeModal}
        />
      )}

      {activeModal === "delete" && (
        <DeleteBoardFeature
          boardId={activeBoard.id!}
          boardName={activeBoard.name}
          open={true}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
