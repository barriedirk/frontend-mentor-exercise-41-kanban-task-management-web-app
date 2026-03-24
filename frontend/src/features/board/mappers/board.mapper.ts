import { BoardModel } from "../types/board.types";
import { BoardFormBase } from "../types/board-form.types";
import { StrapiBoard } from "../types/StrapiBoardResponse";

export function boardToForm(board: BoardModel): BoardFormBase {
  return {
    id: board.id,
    name: board.name,
    columns:
      board.columns?.map((c) => ({
        id: c.id || "",
        documentId: c.documentId || "",
        name: c.name,
        position: c.position,
      })) ?? [],
  };
}

export const mapStrapiToBoard = (strapiBoard: StrapiBoard): BoardModel => {
  return {
    id: strapiBoard.documentId,
    name: strapiBoard.name || "Untitled Board",

    columns: (strapiBoard.columns || []).map((col) => ({
      id: col.id,
      documentId: col.documentId,
      name: col.name,
      position: col.position || 0,
    })),
    shareToken: strapiBoard.shareToken ?? null,
    shareMode: strapiBoard.shareMode ?? null,
  };
};

export const mapStrapiToBoards = (strapiData: {
  data: StrapiBoard[];
}): BoardModel[] => {
  if (!strapiData?.data) return [];

  return strapiData.data.map(mapStrapiToBoard);
};
