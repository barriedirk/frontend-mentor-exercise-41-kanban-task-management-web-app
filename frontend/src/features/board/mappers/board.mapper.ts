import { BoardModel } from "../types/board.types";
import { BoardFormBase } from "../types/board-form.types";
import {
  StrapiBoard,
  StrapiColumnComponent,
} from "../types/StrapiBoardResponse";

function getAttributes(data: StrapiBoard) {
  // Usamos "in" para verificar si la propiedad existe sin castear a any
  if ("attributes" in data && data.attributes) {
    return data.attributes;
  }
  return data;
}

interface BoardContent {
  name: string;
  columns?: StrapiColumnComponent[];
  shareToken?: string | null;
  shareMode?: "read" | "edit" | null;
}

export function boardToForm(board: BoardModel): BoardFormBase {
  return {
    id: board.id,
    name: board.name,
    columns:
      board.columns?.map((c) => ({
        id: c.id!,
        name: c.name,
        position: c.position,
      })) ?? [],
  };
}

// export function formToBoard(form: BoardFormBase, boardId?: string): BoardModel {
//   return {
//     id: boardId ?? crypto.randomUUID(),
//     name: form.name,
//     columns: form.columns.map((c, index) => ({
//       id: c.id ?? crypto.randomUUID(),
//       name: c.name,
//       position: index,
//     })),
//   };
// }

export const mapStrapiToBoard = (strapiBoard: StrapiBoard): BoardModel => {
  const content = (
    "attributes" in strapiBoard ? strapiBoard.attributes : strapiBoard
  ) as BoardContent;

  return {
    id: strapiBoard.documentId.toString(),
    name: content.name || "Untitled Board",
    columns: (content.columns || []).map((col) => ({
      id: col.id.toString(),
      name: col.name,
      position: col.position || 0,
    })),
    shareToken: content.shareToken ?? null,
    shareMode: content.shareMode ?? null,
  };
};

export const mapStrapiToBoards = (strapiData: {
  data: StrapiBoard[];
}): BoardModel[] => {
  if (!strapiData?.data || !Array.isArray(strapiData.data)) return [];
  return strapiData.data.map(mapStrapiToBoard);
};
