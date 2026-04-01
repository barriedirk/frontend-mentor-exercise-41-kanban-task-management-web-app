"use client";

import "./board-column.css";

import { useId } from "react";
import { BoardColumnTask } from "./BoardColumnTask";

import { BoardColumnModel } from "@/features/board/types/board.types";

interface BoardColumnProps {
  column: BoardColumnModel;
}

export default function BoardColumn({ column }: BoardColumnProps) {
  const titleId = useId();

  return (
    <section className="board-column h-full px-4" aria-labelledby={titleId}>
      <h3
        className="board-column__title text-heading-s text-medium-grey flex items-center gap-2 p-2 mb-6 [unicode-bidi:isolate]"
        id={titleId}
      >
        <span
          aria-hidden="true"
          className="w-3.75 h-3.75 bg-main-purple rounded-full"
        ></span>
        {column.name} ({column.tasks?.length})
      </h3>
      <ul className="board-column__tasks flex flex-col gap-6 overflow-y-auto scrollbar-width-none">
        {column.tasks?.map((task) => (
          <BoardColumnTask key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
