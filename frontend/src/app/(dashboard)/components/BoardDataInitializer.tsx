"use client";

import { useEffect } from "react";
import { useBoardStore } from "@/features/board/store/useBoardStore";
import { BoardModel } from "@/features/board/types/board.types";

export default function BoardDataInitializer({
  boards,
}: {
  boards: BoardModel[];
}) {
  const setBoards = useBoardStore((state) => state.setBoards);

  useEffect(() => {
    setBoards(boards);
  }, [boards, setBoards]);

  return null;
}
