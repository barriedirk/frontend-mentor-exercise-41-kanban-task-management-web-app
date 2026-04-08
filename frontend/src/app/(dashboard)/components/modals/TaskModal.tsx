"use client";

import { useId, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver } from "react-hook-form";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import TaskForm from "./TaskForm";
import { BoardColumnModel } from "@/features/board/types/board.types";

import { addTaskSchema } from "@/schemas/task.schema";
import { SubMenuItem } from "@/features/board/types/sub-menu-item";

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
  const subMenus: SubMenuItem[] = useMemo(
    () => [
      {
        label: "Close Modal",
        onClick: () => {
          onCancel();
        },
      },
    ],
    [onCancel],
  );

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title={title}
      onClose={onCancel}
      subMenus={subMenus}
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
          isLoading={loading}
          onSubmit={async (values) => {
            onConfirm(values);
          }}
        />
      )}
    </Modal>
  );
}
