"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver } from "react-hook-form";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import TaskForm from "./TaskForm";
import { BoardColumnModel } from "@/features/board/types/board.types";

import { addTaskSchema } from "@/schemas/task.schema";

interface TaskModalProps {
  status: BoardColumnModel[] | undefined;
  open: boolean;
  title: string;
  task: TaskFormBase;
  loading?: boolean;
  submitLabel?: string;
  onCancel: () => void;
  onConfirm: (values: TaskFormBase) => void;
}

export default function TaskModal({
  open,
  title,
  task,
  status,
  loading,
  submitLabel = "Create Task",
  onCancel,
  onConfirm,
}: TaskModalProps) {
  const formTitleId = useId();

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title={title}
      onClose={onCancel}
      size="large"
    >
      {!status?.length && <p>Please, add a columns before you add a task.</p>}
      {!!status?.length && (
        <TaskForm
          defaultValues={task}
          resolver={
            zodResolver(addTaskSchema) as unknown as Resolver<TaskFormBase>
          }
          submitLabel={submitLabel}
          status={status}
          onSubmit={async (values) => {
            onConfirm(values);
          }}
        />
      )}
    </Modal>
  );
}
