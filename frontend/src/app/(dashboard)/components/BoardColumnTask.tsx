"use client";

// import EditTaskFeature from "@/features/board/components/EditTaskFeature";
import UpdateTaskFeature from "@/features/board/components/UpdateTaskFeature";
import { TaskModel } from "@/features/board/types/task.types";
import { useState } from "react";

interface BoardColumnTaskProps {
  task: TaskModel;
}

export function BoardColumnTask({ task }: BoardColumnTaskProps) {
  const [openSubTaskModal, setOpenTaskModal] = useState(false);
  const totalChecked = task.subTasks.reduce(
    (acc, subTask) => acc + (subTask.completed === true ? 1 : 0),
    0,
  );

  return (
    <>
      {openSubTaskModal && (
        <UpdateTaskFeature
          task={task}
          open={openSubTaskModal}
          onClose={() => setOpenTaskModal(false)}
        />
      )}
      <li>
        <button
          className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full"
          onClick={() => setOpenTaskModal(true)}
        >
          <h4
            className="text-heading-m text-foreground [unicode-bidi:isolate]"
            title="Research pricing points of various competitors and trial different business models"
          >
            {task.description}
          </h4>
          <p
            className="text-medium-grey text-body-m [unicode-bidi:isolate]"
            title="0 of 3 substasks text-body-m"
          >
            {totalChecked} of {task.subTasks.length} substasks
          </p>
        </button>
      </li>
    </>
  );
}
