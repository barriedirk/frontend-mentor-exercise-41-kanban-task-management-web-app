"use client";

import EditTaskModal from "@/app/(dashboard)/components/modals/EditTaskModal";

import { useMemo, useTransition } from "react";
import { TaskModel } from "../types/task.types";
import { taskToForm } from "../mappers/task.mapper";
import { useBoardStore } from "../store/useBoardStore";
import { toast } from "sonner";

interface EditTaskFeatureProps {
  task: TaskModel;
  open: boolean;
  onClose: () => void;
}

export default function EditTaskFeature({
  task,
  open,
  onClose,
}: EditTaskFeatureProps) {
  const board = useBoardStore((state) => state.activeBoard);
  const [isPending, startTransition] = useTransition();

  const defaultValues = useMemo(() => taskToForm(task), [task]);

  async function handleConfirm() {
    const toastId = toast.loading("Adding task...");
    startTransition(async () => {
      // const success = await addTask(values as unknown as AddTaskValues);
      // if (success) {
      //   toast.success("Task created successfully", { id: toastId });
      //   onClose();
      //   router.refresh();
      // } else {
      //   toast.error("Failed to create task. Please try again.", {
      //     id: toastId,
      //   });
      // }
    });
  }

  return (
    <EditTaskModal
      status={board?.columns}
      task={defaultValues}
      open={open}
      loading={!isPending}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  );
}
