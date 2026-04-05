import { BoardModel } from "../types/board.types";
import { sortByPosition } from "../utils/sortByPosition";

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
