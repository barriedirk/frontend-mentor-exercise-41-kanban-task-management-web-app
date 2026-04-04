"use server";

// endpoint RPC (Remote Procedure Call)

import { strapiFetch } from "@/lib/strapi/client";
import { cookies } from "next/headers";
import { AddTaskValues } from "@/schemas/task.schema";
import { TaskEditModel, TaskUpdateModel } from "../types/task.types";
import { StrapiResponse, StrapiTaskResponse } from "@/lib/strapi/type";

interface UpdateTaskPositionProps {
  taskId: string;
  newColumnId: string;
  newPosition: number;
}

export async function updateTaskPosition({
  taskId,
  newColumnId,
  newPosition,
}: UpdateTaskPositionProps) {
  // PUT a /api/tasks/${taskId}
  // data: { column: newColumnId, position: newPosition }
}

export async function addTask(
  values: AddTaskValues,
): Promise<StrapiTaskResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const payload = {
      data: {
        name: values.name,
        description: values.description,
        column: values.columnId,
        subtask: values.subTasks.map((st) => ({
          name: st.name,
          completed: st.completed ?? false,
        })),
      },
    };

    const response = (await strapiFetch("tasks?populate=subtask", {
      method: "POST",
      token: token,
      body: JSON.stringify(payload),
    })) as StrapiResponse<StrapiTaskResponse>;

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
}

export async function updateTask(
  taskDocumentId: string,
  payload: TaskUpdateModel | TaskEditModel,
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const body = {
      data: {
        ...(payload.columnId && { column: payload.columnId }),
        ...("name" in payload && { name: payload.name }),
        ...("description" in payload && { description: payload.description }),
        subtask: payload.subtask,
      },
    };

    return await strapiFetch(`tasks/${taskDocumentId}?populate=subtask`, {
      method: "PUT",
      token,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

export async function deleteTask(taskDocumentId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    return await strapiFetch(`tasks/${taskDocumentId}`, {
      method: "DELETE",
      token,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
}
