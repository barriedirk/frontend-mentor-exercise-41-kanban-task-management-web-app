export type ShareMode = "read" | "edit" | null;

export interface BoardModelBase {
  id?: string;
  name: string;
}

export interface BoardModel extends BoardModelBase {
  columns: BoardColumn[];
  // @todo, shareToken and shareMode will be implemented later
  shareToken?: string | null;
  shareMode?: ShareMode;
}

export interface BoardColumn {
  id?: string;
  name: string;
  position?: number;
}
