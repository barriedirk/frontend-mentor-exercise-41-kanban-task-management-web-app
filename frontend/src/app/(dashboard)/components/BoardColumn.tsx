"use client";

import "./board-column.css";

import { TaskModel } from "@/features/board/types/task.types";

import { useId } from "react";
import { BoardColumnTask } from "./BoardColumnTask";


import { useBoardStore } from "@/features/board/store/useBoardStore";

export const mockTasks: TaskModel[] = [
  {
    id: "task-1",
    name: "Build authentication flow",
    description:
      "Implement login, logout, and token refresh using Strapi authentication.",
    columnId: "todo",
    subTasks: [
      { id: "st-1-1", name: "Create login page UI", completed: true },
      { id: "st-1-2", name: "Connect login API", completed: false },
      { id: "st-1-3", name: "Handle auth errors", completed: false },
    ],
  },
  {
    id: "task-2",
    name: "Design board layout",
    description: "Create the main board UI with columns and draggable tasks.",
    columnId: "doing",
    subTasks: [
      { id: "st-2-1", name: "Column layout", completed: true },
      { id: "st-2-2", name: "Task card component", completed: true },
      { id: "st-2-3", name: "Empty state design", completed: false },
    ],
  },
];

interface BoardColumnProps {
    id: string | number;
  name: string;
}

export default function BoardColumn({id, name}:BoardColumnProps) {
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
        {name} ({mockTasks.length})
      </h3>
      <ul className="board-column__tasks flex flex-col gap-6 overflow-y-auto scrollbar-width-none">
        {mockTasks.map((task) => (
          <BoardColumnTask key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
