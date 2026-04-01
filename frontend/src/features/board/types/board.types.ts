import { TaskModel } from "./task.types";

export type ShareMode = "read" | "edit" | null;

export interface BoardModelBase {
  id?: string;
  name: string;
}

export interface BoardModel extends BoardModelBase {
  columns: BoardColumnModel[];
  // @todo, shareToken and shareMode will be implemented later
  shareToken?: string | null;
  shareMode?: ShareMode;
}

export interface BoardColumnModel {
  id?: number | string | undefined;
  documentId?: string;
  name: string;
  position?: number;
  tasks?: TaskModel[];
}
