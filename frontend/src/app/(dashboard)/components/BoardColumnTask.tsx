"use client";

import TaskFeature from "@/features/board/components/TaskFeature";
import { TaskModel } from "@/features/board/types/task.types";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { useState } from "react";

interface BoardColumnTaskProps {
  task: TaskModel;
  index: number;
}

export function BoardColumnTask({ task, index }: BoardColumnTaskProps) {
  const [openSubTaskModal, setOpenTaskModal] = useState(false);
  const totalChecked = task.subTasks.reduce(
    (acc, subTask) => acc + (subTask.completed === true ? 1 : 0),
    0,
  );

  return (
    <>
      {openSubTaskModal && (
        <TaskFeature
          task={task}
          open={openSubTaskModal}
          onClose={() => setOpenTaskModal(false)}
        />
      )}
      <Draggable draggableId={task.id!.toString()} index={index}>
        {(provided, snapshot) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={clsx(
              "mb-4 outline-none",
              snapshot.isDragging ? "zIndex-50" : "",
            )}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenTaskModal(true)}
              onKeyDown={(e) => e.key === "Enter" && setOpenTaskModal(true)}
              className={clsx(
                "board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl w-full cursor-pointer",
                "shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:border-main-purple border border-transparent transition-colors",
              )}
            >
              <h4
                className="text-heading-m text-foreground [unicode-bidi:isolate]"
                title="Research pricing points of various competitors and trial different business models"
              >
                {task.name}
              </h4>
              <p
                className="text-medium-grey text-body-m [unicode-bidi:isolate]"
                title="0 of 3 substasks text-body-m"
              >
                {totalChecked} of {task.subTasks.length} substasks
              </p>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
}
