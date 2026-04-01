import { create } from "zustand";
import { BoardModel } from "../types/board.types";
import { TaskModel } from "../types/task.types";

interface BoardState {
  boards: BoardModel[];
  activeBoard: BoardModel | null;
  isLoading: boolean;

  setBoards: (boards: BoardModel[]) => void;
  setActiveBoard: (board: BoardModel) => void;
  hasActiveBoard: () => boolean;
  setLoading: (loading: boolean) => void;
  updateActiveBoard: (updatedBoard: BoardModel) => void;
  setAddTask: (columnId: string | number, newTask: TaskModel) => void;
  removeBoard: (id: string) => void;
  updateTaskInState: (taskId: string, updatedTask: Partial<TaskModel>) => void;
  deleteTask: (columnId: string | number, taskId: string | number) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  activeBoard: null,
  isLoading: false,

  setBoards: (boards) => set({ boards }),
  // @todo, remove comments
  // former function
  // setBoards: (boards) => {
  //   set({ boards });

  //   if (boards.length > 0 && !get().activeBoardId) {
  //     set({ activeBoardId: boards[0].id });
  //   }
  // },

  setLoading: (loading) => set({ isLoading: loading }),
  setActiveBoard: (board) => set({ activeBoard: board, isLoading: false }),
  hasActiveBoard: () => !!get().activeBoard,

  updateActiveBoard: (updatedBoard) => {
    set({ activeBoard: updatedBoard });

    const updatedList = get().boards.map((b) =>
      b.id === updatedBoard.id ? updatedBoard : b,
    );
    set({ boards: updatedList });
  },

  setAddTask: (columnId, newTask) =>
    set((state) => {
      if (!state.activeBoard) return state;

      return {
        activeBoard: {
          ...state.activeBoard,
          columns: state.activeBoard.columns.map((col) => {
            if (col.documentId === columnId || col.id === columnId) {
              return {
                ...col,
                tasks: [...(col.tasks || []), newTask],
              };
            }
            return col;
          }),
        },
      };
    }),

  removeBoard: (id) => {
    const updatedBoards = get().boards.filter((b) => b.id !== id);
    set({
      boards: updatedBoards,
      activeBoard: get().activeBoard?.id === id ? null : get().activeBoard,
    });
  },

  updateTaskInState: (taskId: string, updatedTask: Partial<TaskModel>) => {
    set((state) => {
      if (!state.activeBoard) return state;

      const newColumns = state.activeBoard.columns.map((col) => ({
        ...col,
        tasks: (col.tasks || []).map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task,
        ),
      }));

      return {
        activeBoard: { ...state.activeBoard, columns: newColumns },
      };
    });
  },

  deleteTask: (columnId, taskId) =>
    set((state) => {
      if (!state.activeBoard) return state;

      return {
        activeBoard: {
          ...state.activeBoard,
          columns: state.activeBoard.columns.map((col) => {
            if (col.id === columnId || col.documentId === columnId) {
              return {
                ...col,
                tasks: (col.tasks || []).filter(
                  (t) => t.documentId !== taskId && t.id !== taskId,
                ),
              };
            }

            return col;
          }),
        },
      };
    }),
}));
