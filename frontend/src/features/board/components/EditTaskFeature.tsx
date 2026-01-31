"use client";

import EditTaskModal from "@/app/(dashboard)/components/modals/EditTaskModal";

import { useMemo, useState } from "react";
import { TaskModel } from "../types/task.types";
import { taskToForm } from "../mappers/task.mapper";

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
  const [loading, setLoading] = useState(false);
  const defaultValues = useMemo(() => taskToForm(task), [task]);

  async function handleConfirm() {
    try {
      setLoading(true);
      // await editBoard(board.id);
      // toast.success("Board deleted");
      onClose();
      // later: router.push("/boards") or refresh
    } catch (error) {
      // toast.error("Failed to delete board");
    } finally {
      setLoading(false);
    }
  }

  return (
    <EditTaskModal
      task={defaultValues}
      open={open}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  );
}
