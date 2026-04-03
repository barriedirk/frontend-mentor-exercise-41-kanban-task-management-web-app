"use client";

import "./board-column.css";

import { Draggable } from "@hello-pangea/dnd";

import { useId } from "react";
import { BoardColumnTask } from "./BoardColumnTask";

import { BoardColumnModel } from "@/features/board/types/board.types";
import clsx from "clsx";

interface BoardColumnProps {
  column: BoardColumnModel;
  index: number;
}

export default function BoardColumn({ column, index }: BoardColumnProps) {
  const titleId = useId();

  return (
    <Draggable draggableId={column.id!.toString()} index={index}>
      {(provided, snapshot) => (
        <section
          className={clsx(
            "board-column h-full px-4",
            snapshot.isDragging && "bg-light-grey/20 shadow-lg",
          )}
          aria-labelledby={titleId}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3
            className={clsx(
              "board-column__title text-heading-s text-medium-grey",
              "flex items-center gap-2 p-2 mb-6",
              "cursor-grab active:cursor-grabbing",
            )}
            id={titleId}
            {...provided.dragHandleProps}
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
      )}
    </Draggable>
  );
}
