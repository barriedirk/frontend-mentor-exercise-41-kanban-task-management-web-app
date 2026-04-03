import { BoardModel } from "../types/board.types";

interface HasPosition {
  position?: number;
}

function sortByPosition<T extends HasPosition>(a: T, b: T): number {
  const posA = a.position ?? Number.MAX_SAFE_INTEGER;
  const posB = b.position ?? Number.MAX_SAFE_INTEGER;

  return posA - posB;
}

export function orderColumnsTaskBoard(board: BoardModel): BoardModel {
  const columnsOrdered = (board.columns || [])
    .map((column) => {
      const tasksOrdered = column.tasks
        ? [...column.tasks].sort(sortByPosition)
        : [];

      return {
        ...column,
        tasks: tasksOrdered,
      };
    })
    .sort(sortByPosition);

  return { ...board, columns: columnsOrdered };
}
