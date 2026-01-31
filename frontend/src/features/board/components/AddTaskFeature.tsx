"use client";

import { useMemo, useState } from "react";
import { TaskModel } from "../types/task.types";
import { taskToForm } from "../mappers/task.mapper";
import AddTaskModal from "@/app/(dashboard)/components/modals/AddTaskModal";

interface AddTaskFeatureProps {
  open: boolean;
  onClose: () => void;
}

const emptyTask: TaskModel = {
  id: "",
  name: "",
  description: "",
  columnId: "",
  subTasks: [{ id: crypto.randomUUID(), name: "" }],
};

export default function AddTaskFeature({ open, onClose }: AddTaskFeatureProps) {
  const [loading, setLoading] = useState(false);
  const defaultValues = useMemo(() => taskToForm(emptyTask), []);

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
    <AddTaskModal
      task={defaultValues}
      open={open}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  );
}
