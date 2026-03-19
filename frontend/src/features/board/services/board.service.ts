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
  debugger;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) throw new Error("No auth token found");

    const { id, ...dataToUpdate } = values;

    // const body = {
    //   data: {
    //     name: dataToUpdate.name,
    //     // IMPORTANTE: En Strapi 5, para actualizar la lista de componentes,
    //     // a menudo es mejor enviar solo los datos.
    //     // Si quieres mantener el ID, debe ser estrictamente un número.
    //     columns: dataToUpdate.columns.map((col) => {
    //       const isNumericId =
    //         !isNaN(Number(col.id)) && !String(col.id).includes("-");

    //       return {
    //         // Solo incluimos el ID si es numérico real
    //         ...(isNumericId ? { id: Number(col.id) } : {}),
    //         name: col.name,
    //         position: col.position || 0,
    //       };
    //     }),
    //   },
    // };

    const body = {
      data: {
        name: dataToUpdate.name,
        // ELIMINAMOS LOS IDS: Enviamos solo la data limpia.
        // Strapi 5 sobreescribirá la lista de columnas con este nuevo orden.
        columns: dataToUpdate.columns.map((col, index) => ({
          name: col.name,
          position: col.position || index, // Usamos el index del map si no hay posición
        })),
      },
    };

    console.log("Payload final para Strapi:", JSON.stringify(body));

    await strapiFetch<void>(`boards/${id}`, {
      method: "PUT",
      token: token,
      body: JSON.stringify(body),
    });

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

    await strapiFetch<void>("boards", {
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

    return true;
  } catch (error) {
    console.error("Error adding board:", error);
    return false;
  }
}
