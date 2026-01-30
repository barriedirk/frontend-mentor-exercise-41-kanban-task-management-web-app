
import { BoardModel } from "../types/board.types";
import { BoardFormBase } from "../types/board-form.types";

export function boardToForm(
  board: BoardModel,
): BoardFormBase {
  return {
    name: board.name,
    columns:
      board.columns?.map((c) => ({
        id: c.id,
        name: c.name,
        position: c.position,
      })) ?? [{ name: "" }],
  };
}

export function formToBoard(
  form: BoardFormBase,
  boardId?: string,
): BoardModel {
  return {
    id: boardId ?? crypto.randomUUID(),
    name: form.name,
    columns: form.columns.map((c, index) => ({
      id: c.id ?? crypto.randomUUID(),
      name: c.name,
      position: index,
    })),
  };
}
