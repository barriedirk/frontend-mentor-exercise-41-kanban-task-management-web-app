import { TaskEditModel, TaskModel, TaskUpdateModel } from "../types/task.types";
import { TaskFormBase } from "../types/task-form.types";
import { StrapiTaskResponse } from "@/lib/strapi/type";
import { POSITION_STEP } from "@/lib/constants";

export function taskToForm(task: TaskModel): TaskFormBase {
  return {
    name: task.name,
    description: task.description,
    columnId: task.columnId?.toString() ?? "",
    subTasks: task?.subTasks?.map((c) => ({
      id: c.id?.toString(),
      name: c.name,
      completed: c.completed ?? false,
    })) ?? [{ name: "" }],
  };
}

export function formToTask(form: TaskFormBase, taskId: string): TaskModel {
  return {
    id: taskId ?? crypto.randomUUID(),
    name: form.name,
    description: form.description,
    columnId: form.columnId,
    position: form.position || 0,
    subTasks: form.subTasks.map((c) => ({
      id: c.id ?? crypto.randomUUID(),
      name: c.name,
      completed: c.completed ?? false,
    })),
  };
}

export const mapFormToStrapiUpdate = (
  values: TaskFormBase,
): TaskUpdateModel => {
  return {
    columnId: values.columnId,
    subtask: (values.subTasks || []).map((sub) => ({
      name: sub.name,
      completed: sub.completed,
    })),
  };
};

export const mapFormToStrapiEdit = (values: TaskFormBase): TaskEditModel => {
  return {
    columnId: values.columnId,
    description: values.description,
    name: values.name,
    subtask: (values.subTasks || []).map((sub) => ({
      name: sub.name,
      completed: !!sub.completed,
    })),
  };
};

export const mapStrapiToTask = (
  columnId: string,
  task: StrapiTaskResponse,
): TaskModel => {
  return {
    columnId: columnId || "",
    id: task.documentId,
    name: task.name,
    description: task.description,
    position: task.position ?? POSITION_STEP,
    subTasks: (task.subtask || []).map((st) => ({
      id: st.id || "",
      name: st.name,
      completed: st.completed,
    })),
  };
};
