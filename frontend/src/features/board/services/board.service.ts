"use server";

// endpoint RPC (Remote Procedure Call)

import { strapiFetch } from "@/lib/strapi/client";
import { cookies } from "next/headers";
import { StrapiBoard } from "../types/StrapiBoardResponse";
import { AddBoardValues, EditBoardValues } from "@/schemas/board.schema";
import { BoardModel } from "../types/board.types";
import { mapStrapiToBoard } from "../mappers/board.mapper";
import { POSITION_STEP } from "@/lib/constants";

interface UpdateColumnsOrderProps {
  columns: { documentId: string; position: number }[];
}

export async function updateColumnsOrder({ columns }: UpdateColumnsOrderProps) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const updatePromises = columns.map((col) =>
      strapiFetch(`columns/${col.documentId}`, {
        method: "PUT",
        token: token,
        body: JSON.stringify({
          data: { position: col.position },
        }),
      }),
    );

    await Promise.all(updatePromises);

    return true;
  } catch (error) {
    console.error("Error al actualizar posiciones individuales", error);
    return false;
  }
}

export async function getBoards() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("No auth token found");

  return strapiFetch<{ data: StrapiBoard[] }>("boards", {
    token,
    next: { revalidate: 0 },
  });
}

export async function getBoardById(
  documentId: string,
): Promise<BoardModel | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const query = new URLSearchParams();
    query.append("populate[columns][populate][tasks][populate]", "subtask");

    const response = await strapiFetch<{ data: StrapiBoard }>(
      `boards/${documentId}?${query.toString()}`,
      {
        method: "GET",
        token: token,
        next: {
          revalidate: 0,
          tags: [`board-${documentId}`],
        },
      },
    );

    if (!response.data) return null;

    return mapStrapiToBoard(response.data);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw error;
      }
    }

    console.error("Error fetching board details:", error);
    return null;
  }
}

export async function deleteBoard(id: string): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

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

export async function editBoard(values: EditBoardValues): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const { id: boardDocumentId, ...dataToUpdate } = values;

    const columnIdsFinals = await Promise.all(
      dataToUpdate.columns.map(async (col) => {
        if (col.id) {
          return col.id;
        }

        const newColResponse = await strapiFetch<{
          data: { documentId: string };
        }>(`columns`, {
          method: "POST",
          token: token,
          body: JSON.stringify({
            data: {
              name: col.name,
              board: boardDocumentId,
              position: col.position ?? 0,
            },
          }),
        });

        return newColResponse.data.documentId;
      }),
    );

    await strapiFetch<void>(`boards/${boardDocumentId}`, {
      method: "PUT",
      token: token,
      body: JSON.stringify({
        data: {
          name: dataToUpdate.name,
          columns: columnIdsFinals,
        },
      }),
    });

    const columnsToUpdate = dataToUpdate.columns.filter((col) => col.id);

    if (columnsToUpdate.length > 0) {
      await Promise.all(
        columnsToUpdate.map((col, index) =>
          strapiFetch<void>(`columns/${col.id}`, {
            method: "PUT",
            token: token,
            body: JSON.stringify({
              data: {
                name: col.name,
                position: (index + 1) * POSITION_STEP,
              },
            }),
          }),
        ),
      );
    }

    return true;
  } catch (error) {
    console.error("Error editing board:", error);
    return false;
  }
}

export async function addBoard(values: AddBoardValues): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const boardResponse = await strapiFetch<{ data: { documentId: string } }>(
      "boards",
      {
        method: "POST",
        token: token,
        body: JSON.stringify({
          data: {
            name: values.name,
          },
        }),
      },
    );

    const boardDocumentId = boardResponse.data.documentId;

    if (!boardDocumentId) throw new Error("Failed to retrieve new Board ID");

    const columnPromises = values.columns.map((col, index) => {
      return strapiFetch("columns", {
        method: "POST",
        token: token,
        body: JSON.stringify({
          data: {
            name: col.name,
            position: (index + 1) * POSITION_STEP,
            board: boardDocumentId,
          },
        }),
      });
    });

    try {
      await Promise.all(columnPromises);
    } catch (err) {
      await strapiFetch(`boards/${boardDocumentId}`, {
        method: "DELETE",
        token,
      });

      throw err;
    }

    return true;
  } catch (error) {
    console.error("Error adding board:", error);
    return false;
  }
}
