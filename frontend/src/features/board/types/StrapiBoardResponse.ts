import { HasPosition } from "./has-position";

export interface StrapiSubtask {
  id: number;
  name: string;
  completed: boolean;
}

export interface StrapiTask extends HasPosition {
  id: number;
  documentId: string;
  name: string;
  description: string;
  subtask: StrapiSubtask[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiColumn extends HasPosition {
  id: number;
  documentId: string;
  name: string;
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
