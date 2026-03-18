export interface StrapiColumnComponent {
  id: number;
  name: string;
  position: number;
}

export interface StrapiColumn {
  id: number;
  attributes: {
    name: string;
    position: number;
  };
}

export interface StrapiBoard {
  id: number;
  documentId: string;
  attributes: {
    name: string;
    shareToken?: string | null;
    shareMode?: "read" | "edit" | null;
    columns: StrapiColumnComponent[];
    createdAt: string;
    updatedAt: string;
  };
}
