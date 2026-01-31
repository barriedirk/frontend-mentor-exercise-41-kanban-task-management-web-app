"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";

interface AddTaskModalProps {
  open: boolean;
  task: TaskFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AddTaskModal({
  open,
  task,
  loading,
  onCancel,
  onConfirm,
}: AddTaskModalProps) {
  const formTitleId = useId();

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Add New Task"
      onClose={onCancel}
      size="large"
    >
      <h1>Add New Task</h1>
    </Modal>
  );
}
