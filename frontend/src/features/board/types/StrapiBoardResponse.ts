/*
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
*/

export interface StrapiSubtask {
  id: number;
  name: string;
  completed: boolean;
}

export interface StrapiTask {
  id: number;
  documentId: string;
  name: string;
  description: string;
  subtask: StrapiSubtask[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiColumn {
  id: number;
  documentId: string;
  name: string;
  position: number;
  tasks?: StrapiTask[];
  createdAt: string;
  updatedAt: string;
}

export interface StrapiBoard {
  id: number;
  documentId: string;
  name: string;
  shareToken?: string | null;
  shareMode?: "read" | "edit" | null;
  columns?: StrapiColumn[];
  createdAt: string;
  updatedAt: string;
}
