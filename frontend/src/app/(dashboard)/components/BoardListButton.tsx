"use client";

import BoardIcon from "@/components/icons/BoardIcon";
import { BoardModelBase } from "@/features/board/types/board.types";

interface BoardListButtonProps {
  board: BoardModelBase;
  onClick?: () => void;
}

export default function BoardListButton({
  board,
  onClick,
}: BoardListButtonProps) {
  return (
    <button
      type="button"
      aria-current="page"
      className="flex items-center gap-2 hover:bg-main-purple rounded-r-4xl py-2.75 px-3 -translate-x-3 w-full hover:text-white overflow-hidden group"
      onClick={onClick}
    >
      <BoardIcon className="board-list__icon w-4 h-4 group-hover:text-white" />
      {board.name}
    </button>
  );
}
