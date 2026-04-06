"use client";

import { useId, memo, useMemo } from "react";

import Modal from "@/components/ui/Modal";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import UpdateTaskForm from "./UpdateTaskForm";
import { SubMenuItem } from "@/features/board/types/sub-menu-item";
import { BoardColumnModel } from "@/features/board/types/board.types";

interface UpdateTaskModalProps {
  open: boolean;
  task: TaskFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (values: TaskFormBase) => void;
  showDeleteModalTask: () => void;
  showEditModalTask: () => void;
  status?: BoardColumnModel[];
}

const UpdateTaskModal = memo(
  ({
    open,
    task,
    loading,
    onCancel,
    onConfirm,
    showDeleteModalTask,
    showEditModalTask,
    status,
  }: UpdateTaskModalProps) => {
    const formTitleId = useId();

    const subMenus: SubMenuItem[] = useMemo(
      () => [
        {
          label: "Edit Task",
          onClick: () => {
            showEditModalTask();
          },
        },
        {
          label: "Delete Task",
          onClick: () => {
            showDeleteModalTask();
          },
        },
      ],
      [showEditModalTask, showDeleteModalTask],
    );

    return (
      <Modal
        open={open}
        titleId={formTitleId}
        title={task.name}
        onClose={onCancel}
        size="large"
        subMenus={subMenus}
      >
        <UpdateTaskForm
          status={status}
          defaultValues={task}
          submitLabel="Create Task"
          onSubmit={async (values) => {
            onConfirm(values);
          }}
        />
      </Modal>
    );
  },
);

UpdateTaskModal.displayName = "UpdateTaskModal";

export default UpdateTaskModal;
