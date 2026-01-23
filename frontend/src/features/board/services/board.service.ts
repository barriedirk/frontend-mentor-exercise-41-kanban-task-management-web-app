"use server";

import { strapiFetch } from "@/lib/strapi/client";

export async function deleteBoard(boardId: string) {
  await strapiFetch<void>(`boards/${boardId}`, {
    method: "DELETE",
  });
}
