import { create } from "zustand";
import { BoardColumnModel, BoardModel } from "../types/board.types";
import { TaskModel } from "../types/task.types";

interface BoardState {
  isSyncing: boolean;
  boards: BoardModel[];
  activeBoard: BoardModel | null;
  isLoading: boolean;

  moveColumnInStore: (startIndex: number, endIndex: number) => void;
  setBoards: (boards: BoardModel[]) => void;
  setActiveBoard: (board: BoardModel) => void;
  hasActiveBoard: () => boolean;
  setLoading: (loading: boolean) => void;
  updateActiveBoard: (updatedBoard: BoardModel) => void;
  setAddTask: (columnId: string | number, newTask: TaskModel) => void;
  removeBoard: (id: string) => void;
  updateTaskInState: (taskId: string, updatedTask: Partial<TaskModel>) => void;
  deleteTask: (columnId: string | number, taskId: string | number) => void;
  setColumnsInState: (columns: BoardColumnModel[]) => void;
  setIsSyncing: (loading: boolean) => void;
  moveTaskInStore: (
    sourceColId: string,
    destinationColId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  isSyncing: false,
  boards: [],
  activeBoard: null,
  isLoading: false,

  setIsSyncing: (loading: boolean) => {
    set(() => ({
      isSyncing: loading,
    }));
  },

  moveTaskInStore: (
    sourceColId: string,
    destinationColId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => {
    set((state) => {
      if (!state.activeBoard) return state;

      const newColumns = [...state.activeBoard.columns];
      const sourceCol = newColumns.find((c) => c.id === sourceColId);
      const destCol = newColumns.find((c) => c.id === destinationColId);

      if (!sourceCol || !destCol) return state;

      const [movedTask] = (sourceCol.tasks ?? []).splice(sourceIndex, 1);

      if (sourceColId !== destinationColId) {
        movedTask.columnId = destinationColId;
      }

      destCol.tasks?.splice(destinationIndex, 0, movedTask);

      return { activeBoard: { ...state.activeBoard, columns: newColumns } };
    });
  },

  moveColumnInStore: (startIndex: number, endIndex: number) => {
    set((state) => {
      if (!state.activeBoard) return state;

      const newColumns = [...state.activeBoard.columns];
      const [removed] = newColumns.splice(startIndex, 1);
      newColumns.splice(endIndex, 0, removed);

      const updatedColumns = newColumns.map((col, index) => ({
        ...col,
        position: (index + 1) * 10,
      }));

      return {
        activeBoard: {
          ...state.activeBoard,
          columns: updatedColumns,
        },
      };
    });
  },
  setBoards: (boards) => set({ boards }),
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

  setColumnsInState: (columns: BoardColumnModel[]) => {
    set((state) => {
      if (!state.activeBoard) return state;

      return {
        activeBoard: { ...state.activeBoard, columns },
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
