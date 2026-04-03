import { NEW_TEMP_ID } from "@/lib/constants";
import { EditBoardValues } from "@/schemas/board.schema";

export function removeNewIdsFromColumns(
  board: EditBoardValues,
): EditBoardValues {
  return {
    ...board,
    columns: board.columns.map((col, index) => ({
      ...col,
      position: (index + 1) * 10,
      id: col.id?.toString().startsWith(NEW_TEMP_ID) ? undefined : col.id,
    })),
  } as EditBoardValues;
}
