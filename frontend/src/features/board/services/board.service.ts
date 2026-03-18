"use server";

import { strapiFetch } from "@/lib/strapi/client";
import { cookies } from "next/headers";
import { StrapiBoard } from "../types/StrapiBoardResponse";
import { AddBoardValues } from "@/schemas/board.schema";

export async function getBoards() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  //@todo, remove
  if (process.env.NODE_ENV !== "development") {
    console.log("getBoards Strapi:", token ? "Present" : "Missing");
  }

  if (!token) throw new Error("No auth token found");

  return strapiFetch<{ data: StrapiBoard[] }>("boards?populate=columns", {
    cache: "no-store",
    token,
  });
}

export async function deleteBoard(id: string): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    //@todo, remove
    if (process.env.NODE_ENV !== "development") {
      console.log("deleteBoard Strapi:", token ? "Present" : "Missing", id);
    }

    if (!token) throw new Error("No auth token found");

    await strapiFetch(`boards/${id}`, {
      method: "DELETE",
      token,
    });

    return true;
  } catch (error) {
    console.error("Error deleting board:", error);
    return false;
  }
}

// @todo, replace AddBoardValues for the correct type
export async function editBoard(boardId: string, values: AddBoardValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return strapiFetch<void>(`boards/${boardId}`, {
    method: "PUT",
    token: token,
    body: JSON.stringify({ data: values }),
  });
}

export async function addBoard(values: AddBoardValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("No auth token found");

  return strapiFetch<void>("boards", {
    method: "POST",
    token: token,
    body: JSON.stringify({
      data: {
        name: values.name,
        columns: values.columns.map((col) => ({
          name: col.name,
          position: col.position || 0,
        })),
      },
    }),
  });
}
