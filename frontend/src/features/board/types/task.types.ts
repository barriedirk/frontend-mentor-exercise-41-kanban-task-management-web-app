export interface TaskModel {
  id?: string;
  name: string;
  description: string;
  columnId?: string;
  subTasks: SubTaskModel[];
}

export interface SubTaskModel {
  id?: string;
  name: string;
  completed: boolean;
}
