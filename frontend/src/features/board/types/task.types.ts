export interface SubTaskModel {
  id?: string | number;
  documentId?: string;
  name: string;
  completed: boolean;
}

export interface TaskModel {
  id?: string | number;
  documentId?: string;
  name: string;
  description: string;
  columnId: string;
  subTasks: SubTaskModel[];
}
