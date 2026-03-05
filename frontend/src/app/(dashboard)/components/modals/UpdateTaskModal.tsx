"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import UpdateTaskForm from "./UpdateTaskForm";

interface UpdateTaskModalProps {
  open: boolean;
  task: TaskFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function UpdateTaskModal({
  open,
  task,
  loading,
  onCancel,
  onConfirm,
}: UpdateTaskModalProps) {
  const formTitleId = useId();

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title={task.description}
      onClose={onCancel}
      size="large"
    >
      <UpdateTaskForm
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
