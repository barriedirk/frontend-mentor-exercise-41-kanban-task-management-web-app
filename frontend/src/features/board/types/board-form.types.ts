/**
 * Base form type used by react-hook-form.
 * Compatible with BOTH addBoardSchema and editBoardSchema
 */

export interface BoardFormColumn {
  id?: string | number;
  documentId?: string;
  name: string;
  position?: number;
}

export interface BoardFormBase {
  id?: string;
  name: string;
  columns: BoardFormColumn[];
  shareMode?: "read" | "edit" | null;
  shareToken?: string | null;
}
