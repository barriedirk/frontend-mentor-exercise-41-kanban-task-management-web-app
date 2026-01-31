"use client";

import "./board-column.css";

import { TaskModel } from "@/features/board/types/task.types";

import { useId } from "react";
import { BoardColumnTask } from "./BoardColumnTask";

export const mockTasks: TaskModel[] = [
  {
    id: "task-1",
    name: "Build authentication flow",
    description:
      "Implement login, logout, and token refresh using Strapi authentication.",
    columnId: "todo",
    subTasks: [
      { id: "st-1-1", name: "Create login page UI", checked: true },
      { id: "st-1-2", name: "Connect login API", checked: false },
      { id: "st-1-3", name: "Handle auth errors", checked: false },
    ],
  },
  {
    id: "task-2",
    name: "Design board layout",
    description: "Create the main board UI with columns and draggable tasks.",
    columnId: "doing",
    subTasks: [
      { id: "st-2-1", name: "Column layout", checked: true },
      { id: "st-2-2", name: "Task card component", checked: true },
      { id: "st-2-3", name: "Empty state design", checked: false },
    ],
  },
  {
    id: "task-3",
    name: "Implement drag and drop",
    description:
      "Allow tasks to be dragged between columns with smooth animations.",
    columnId: "doing",
    subTasks: [
      { id: "st-3-1", name: "Choose DnD library", checked: true },
      { id: "st-3-2", name: "Move tasks between columns", checked: false },
      { id: "st-3-3", name: "Persist column change", checked: false },
    ],
  },
  {
    id: "task-4",
    name: "Set up notifications",
    description: "Show success and error notifications for all CRUD actions.",
    columnId: "todo",
    subTasks: [
      { id: "st-4-1", name: "Install notification library", checked: true },
      { id: "st-4-2", name: "Success messages", checked: false },
      { id: "st-4-3", name: "Error handling", checked: false },
    ],
  },
  {
    id: "task-5",
    name: "Optimize performance",
    description:
      "Reduce unnecessary renders and improve overall app performance.",
    columnId: "review",
    subTasks: [
      { id: "st-5-1", name: "Memoize heavy components", checked: false },
      { id: "st-5-2", name: "Audit re-renders", checked: false },
    ],
  },
  {
    id: "task-6",
    name: "Deploy application",
    description:
      "Prepare production build and deploy the app to hosting provider.",
    columnId: "done",
    subTasks: [
      { id: "st-6-1", name: "Environment variables", checked: true },
      { id: "st-6-2", name: "Production build", checked: true },
      { id: "st-6-3", name: "Verify deployment", checked: true },
    ],
  },
];

export default function BoardColumn() {
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
        TODO ({mockTasks.length})
      </h3>
      <ul className="board-column__tasks flex flex-col gap-6 overflow-y-auto scrollbar-width-none">
        {mockTasks.map((task) => (
          <BoardColumnTask key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
