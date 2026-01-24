export type ShareMode = "read" | "edit" | null;

export interface BoardEditColumn {
  id: string;
  name: string;
  position?: number;
}

export interface BoardModel {
  id: string;
  name: string;
  columns: BoardEditColumn[];
  // @todo, shareToken and shareMode will be implemented later
  shareToken?: string | null;
  shareMode?: ShareMode;
}
