export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiTaskResponse {
  id: number;
  documentId: string;
  name: string;
  description: string;
  subtask: StrapiSubtaskResponse[];
}

export interface StrapiSubtaskResponse {
  id: number;
  name: string;
  completed: boolean;
}
