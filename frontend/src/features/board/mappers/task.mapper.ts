import { TaskModel } from "../types/task.types";
import { TaskFormBase } from "../types/task-form.types";

export function taskToForm(task: TaskModel): TaskFormBase {
  return {
    name: task.name,
    description: task.description,
    columnId: task.columnId ?? "",
    subTasks: task?.subTasks?.map((c) => ({
      id: c.id,
      name: c.name,
    })) ?? [{ name: "" }],
  };
}

export function formToTask(form: TaskFormBase, taskId: string): TaskModel {
  return {
    id: taskId ?? crypto.randomUUID(),
    name: form.name,
    description: form.description,
    columnId: form.columnId,
    subTasks: form.subTasks.map((c) => ({
      id: c.id ?? crypto.randomUUID(),
      name: c.name,
    })),
  };
}
