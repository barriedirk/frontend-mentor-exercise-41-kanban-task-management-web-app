import { BoardModel } from "../types/board.types";
import { BoardFormBase } from "../types/board-form.types";
import { StrapiBoard } from "../types/StrapiBoardResponse";
import { sortByPosition } from "../utils/sortByPosition";

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
  const columnsOrdered = (strapiBoard.columns || [])
    .map((col) => {
      const taskOrdered = col.tasks ? [...col.tasks].sort(sortByPosition) : [];

      return {
        id: col.documentId || "",
        name: col.name,
        position: col.position || 0,
        tasks: taskOrdered.map((task) => ({
          columnId: col.documentId || "",
          id: task.documentId,
          name: task.name,
          description: task.description,
          position: task.position || 0,
          subTasks: (task.subtask || []).map((st) => ({
            id: st.id || "",
            name: st.name,
            completed: st.completed,
          })),
        })),
      };
    })
    .sort(sortByPosition);

  return {
    id: strapiBoard.documentId,
    name: strapiBoard.name || "Untitled Board",
    columns: columnsOrdered,
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
