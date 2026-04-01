"use client";

import { useBoardStore } from "@/features/board/store/useBoardStore";
import BoardColumns from "./BoardColumns";

export default function BoardBody() {
  const hasActiveBoard = useBoardStore((state) => state.hasActiveBoard());
  const isLoading = useBoardStore((state) => state.isLoading);

  console.log(hasActiveBoard);

  if (isLoading) {
    return (
      <div
        className="board-columns pt-2 px-2 flex items-center justify-center"
        aria-labelledby="board-columns-title"
      >
        Loading ...
      </div>
    );
  }

  if (!hasActiveBoard) {
    return (
      <div
        className="board-columns pt-2 px-2 flex items-center justify-center"
        aria-labelledby="board-columns-title"
      >
        Add a Board or active one.
      </div>
    );
  }

  return <BoardColumns />;
}
