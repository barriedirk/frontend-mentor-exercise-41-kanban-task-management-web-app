export type TaskFormBase = {
  name: string;
  description: string;
  columnId: string;
  subTasks: {
    id?: string;
    name: string;
  }[];
};
