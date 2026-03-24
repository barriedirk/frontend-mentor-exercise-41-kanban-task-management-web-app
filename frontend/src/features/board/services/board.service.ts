"use server";

import { strapiFetch } from "@/lib/strapi/client";
import { cookies } from "next/headers";
import { StrapiBoard } from "../types/StrapiBoardResponse";
import { AddBoardValues, EditBoardValues } from "@/schemas/board.schema";

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

export async function editBoard(values: EditBoardValues): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const { id: boardDocumentId, ...dataToUpdate } = values;

    const columnIdsFinales = await Promise.all(
      dataToUpdate.columns.map(async (col) => {
        if (col.documentId) {
          return col.documentId;
        }

        const newColResponse = await strapiFetch<{
          data: { documentId: string };
        }>(`columns`, {
          method: "POST",
          token: token,
          body: JSON.stringify({
            data: {
              name: col.name,
              position: col.position ?? 0,
              board: boardDocumentId,
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
          columns: columnIdsFinales,
        },
      }),
    });

    // 3. ACTUALIZAR LOS ATRIBUTOS (Nombre/Posición) de las columnas que ya existían
    const columnsToUpdate = dataToUpdate.columns.filter(
      (col) => col.documentId,
    );

    if (columnsToUpdate.length > 0) {
      await Promise.all(
        columnsToUpdate.map((col) =>
          strapiFetch<void>(`columns/${col.documentId}`, {
            method: "PUT",
            token: token,
            body: JSON.stringify({
              data: {
                name: col.name,
                position: col.position ?? 0,
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
            // @todo, review shareMode, shareToken
          },
        }),
      },
    );

    console.log("boardResponse.data", boardResponse.data);

    const boardDocumentId = boardResponse.data.documentId;

    if (!boardDocumentId) throw new Error("Failed to retrieve new Board ID");

    const columnPromises = values.columns.map((col, index) => {
      return strapiFetch("columns", {
        method: "POST",
        token: token,
        body: JSON.stringify({
          data: {
            name: col.name,
            position: col.position ?? 0,
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
