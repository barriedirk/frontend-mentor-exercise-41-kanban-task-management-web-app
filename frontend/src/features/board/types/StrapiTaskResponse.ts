export interface StrapiSubTask {
  id: number;
  attributes: {
    name: string;
    completed: boolean;
  };
}

export interface StrapiTask {
  id: number;
  attributes: {
    name: string;
    description: string;
    board: {
      data: {
        id: number;
      };
    };
    subTasks: {
      data: StrapiSubTask[];
    };
  };
}
