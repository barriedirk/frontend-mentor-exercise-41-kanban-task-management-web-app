"use client";

import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";

import { TaskModel } from "../types/task.types";
import { mapStrapiToTask, taskToForm } from "../mappers/task.mapper";
import TaskModal from "@/app/(dashboard)/components/modals/TaskModal";
import { useBoardStore } from "../store/useBoardStore";
import { toast } from "sonner";
import { AddTaskValues } from "@/schemas/task.schema";
import { TaskFormBase } from "../types/task-form.types";
import { addTask } from "../services/task.service";

interface AddTaskFeatureProps {
  open: boolean;
  onClose: () => void;
}

const emptyTask: TaskModel = {
  id: "",
  name: "",
  description: "",
  columnId: "",
  subTasks: [{ id: crypto.randomUUID(), name: "", completed: false }],
};

export default function AddTaskFeature({ open, onClose }: AddTaskFeatureProps) {
  const board = useBoardStore((state) => state.activeBoard);
  const setAddTask = useBoardStore((state) => state.setAddTask);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const defaultValues = useMemo(() => taskToForm(emptyTask), []);

  async function handleConfirm(values: TaskFormBase) {
    const toastId = toast.loading("Adding task...");

    startTransition(async () => {
      const newTask = await addTask(values as unknown as AddTaskValues);

      if (!!newTask) {
        console.log("newTask", JSON.stringify(newTask));

        setAddTask(values.columnId, mapStrapiToTask(values.columnId, newTask));

        toast.success("Task created successfully", { id: toastId });

        onClose();
        router.refresh();
      } else {
        toast.error("Failed to create task. Please try again.", {
          id: toastId,
        });
      }
    });
  }

  return (
    <TaskModal
      loading={isPending}
      title="Add New Task"
      status={board?.columns}
      task={defaultValues}
      open={open}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  );
}
