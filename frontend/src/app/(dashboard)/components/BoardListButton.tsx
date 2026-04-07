"use client";

import "./board-list-button.css";

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
      className="board-list-button text-left"
      onClick={onClick}
    >
      <BoardIcon className="board-list__icon w-4 h-4 group-hover:text-white" />
      {board.name}
    </button>
  );
}
