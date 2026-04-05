import { HasPosition } from "./has-position";

export interface SubTaskModel {
  id?: string | number;
  documentId?: string | number;
  name: string;
  completed: boolean;
}

export interface TaskModel extends HasPosition {
  id?: string | number;
  documentId?: string | number;
  name: string;
  description: string;
  columnId: string | number;
  subTasks: SubTaskModel[];
}

export interface TaskUpdateModel {
  columnId?: string;
  subtask: SubTaskModel[];
}

export interface TaskEditModel {
  columnId?: string;
  description?: string;
  name?: string;
  subtask: SubTaskModel[];
}
