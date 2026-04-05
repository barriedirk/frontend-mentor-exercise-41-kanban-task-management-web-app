export type TaskFormBase = {
  name: string;
  description: string;
  columnId: string;
  position?: number;
  subTasks: {
    id?: string;
    name: string;
    completed: boolean;
  }[];
};
