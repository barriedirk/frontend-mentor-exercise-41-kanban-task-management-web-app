"use client";
import { useId } from "react";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import TaskForm from "./TaskForm";
import { BoardColumnModel } from "@/features/board/types/board.types";

interface EditTaskModalProps {
  open: boolean;
  task: TaskFormBase;
  loading?: boolean;
  status?: BoardColumnModel[] | undefined;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function EditTaskModal({
  open,
  task,
  status,
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
      {!status?.length && <p>Please, add a columns before you add a task.</p>}
      {!!status?.length && (
        <TaskForm
          defaultValues={task}
          submitLabel="Create Task"
          status={status}
          onSubmit={async (values) => {
            // const parsed = addBoardSchema.parse(values);

            onConfirm();
          }}
        />
      )}
    </Modal>
  );
}
