"use client";

import UpdateTaskModal from "@/app/(dashboard)/components/modals/UpdateTaskModal";

import { useMemo, useState, useTransition } from "react";
import { TaskModel } from "../types/task.types";
import {
  mapFormToStrapiEdit,
  mapFormToStrapiUpdate,
  taskToForm,
} from "../mappers/task.mapper";
import { useBoardStore } from "../store/useBoardStore";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { deleteTask, updateTask } from "../services/task.service";
import { TaskFormBase } from "../types/task-form.types";
import { ShowModalEnum } from "@/app/types/enums";
import { useRouter } from "next/navigation";
import DeleteModal from "@/app/(dashboard)/components/modals/DeleteModal";
import TaskModal from "@/app/(dashboard)/components/modals/TaskModal";

interface TaskFeatureProps {
  task: TaskModel;
  open: boolean;
  onClose: () => void;
}

export default function TaskFeature({ task, open, onClose }: TaskFeatureProps) {
  const router = useRouter();
  const updateTaskInState = useBoardStore((store) => store.updateTaskInState);
  const deleteTaskStore = useBoardStore((store) => store.deleteTask);

  const columns = useBoardStore(
    useShallow((state) => state.activeBoard?.columns),
  );

  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState<ShowModalEnum>(
    ShowModalEnum.Update,
  );

  const [initialTaskData] = useState(() => taskToForm(task));
  const defaultValues = useMemo(() => initialTaskData, [initialTaskData]);

  async function handleDeleteConfirm() {
    const toastId = toast.loading("Delete task...");

    startTransition(async () => {
      if (!task.id) {
        onClose();
        router.refresh();
      }

      const success = await deleteTask(task.id!.toString());

      if (success) {
        toast.success("Task created successfully", { id: toastId });

        deleteTaskStore(task.columnId, task.id!);

        onClose();
        router.refresh();
      } else {
        toast.error("Failed to create task. Please try again.", {
          id: toastId,
        });
      }
    });
  }

  async function handleEditConfirm(values: TaskFormBase) {
    const toastId = toast.loading("Editing task...");

    startTransition(async () => {
      const success = await updateTask(
        task.id as string,
        mapFormToStrapiEdit(values),
      );

      if (success) {
        updateTaskInState(task.id as string, values);

        onClose();
        router.refresh();
      } else {
        toast.error("Failed to edit task. Please try again.", {
          id: toastId,
        });
      }
    });
  }

  async function handleUpdateConfirm(values: TaskFormBase) {
    const toastId = toast.loading("Adding task...");

    startTransition(async () => {
      const success = await updateTask(
        task.id as string,
        mapFormToStrapiUpdate(values),
      );

      if (success) {
        updateTaskInState(task.id as string, values);
      } else {
        toast.error("Failed to create task. Please try again.", {
          id: toastId,
        });
      }
    });
  }

  return (
    <>
      {showModal === ShowModalEnum.Edit && (
        <TaskModal
          loading={isPending}
          title="Edit Task"
          status={columns}
          task={initialTaskData}
          open={open}
          onCancel={onClose}
          onConfirm={handleEditConfirm}
          submitLabel="Update Task"
        />
      )}
      {showModal === ShowModalEnum.Delete && (
        <DeleteModal
          title="Delete this task?"
          open={open}
          text={
            <>
              Are you sure you want to delete the &apos;
              <strong>{task.name}</strong>
              &apos; task and its subtasks? This action cannot be reversed.
            </>
          }
          loading={isPending}
          onCancel={onClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {showModal === ShowModalEnum.Update && (
        <UpdateTaskModal
          status={columns}
          task={defaultValues}
          open={open}
          loading={!isPending}
          onCancel={onClose}
          onConfirm={handleUpdateConfirm}
          showDeleteModalTask={() => setShowModal(ShowModalEnum.Delete)}
          showEditModalTask={() => setShowModal(ShowModalEnum.Edit)}
        />
      )}
    </>
  );
}
