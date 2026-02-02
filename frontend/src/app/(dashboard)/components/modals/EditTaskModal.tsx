"use client";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import TaskForm from "./TaskForm";

interface EditTaskModalProps {
  open: boolean;
  task: TaskFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function EditTaskModal({
  open,
  task,
  loading,
  onCancel,
  onConfirm,
}: EditTaskModalProps) {
  const formTitleId = useId();

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Edit Task"
      onClose={onCancel}
      size="large"
    >
      <TaskForm
        defaultValues={task}
        submitLabel="Create Task"
        onSubmit={async (values) => {
          // const parsed = addBoardSchema.parse(values);

          onConfirm();
        }}
      />
    </Modal>
  );
}
