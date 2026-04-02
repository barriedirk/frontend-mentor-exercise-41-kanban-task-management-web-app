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

  return (
    <div className="board-header__menu">
      <button
        disabled={!activeBoard}
        className="ml-2 w-3 flex items-center"
        title={!activeBoard ? "Please, select a board first." : ""}
        aria-label={
          !activeBoard ? "Please, select a board first." : "Board options"
        }
        onClick={() => setIsMenuOpen(true)}
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
      {isMenuOpen && activeBoard && (
        <BoardHeaderMenuOptions
          onEdit={() => openModal("edit")}
          onDelete={() => openModal("delete")}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      {activeModal === "edit" && activeBoard && (
        <EditBoardFeature
          board={activeBoard}
          open={true}
          onClose={closeModal}
        />
      )}

      {activeModal === "delete" && activeBoard && (
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
