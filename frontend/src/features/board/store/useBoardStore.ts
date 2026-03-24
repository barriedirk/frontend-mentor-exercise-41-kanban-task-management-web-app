import { create } from "zustand";
import { BoardModel } from "../types/board.types";

interface BoardState {
  boards: BoardModel[];
  activeBoardId: string | null;

  setBoards: (boards: BoardModel[]) => void;
  setActiveBoardId: (id: string | null) => void;

  removeBoard: (id: string) => void;

  getActiveBoard: () => BoardModel | undefined;

  updateBoard: (updatedBoard: BoardModel) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  activeBoardId: null,

  setBoards: (boards) => {
    set({ boards });

    if (boards.length > 0 && !get().activeBoardId) {
      set({ activeBoardId: boards[0].id });
    }
  },

  setActiveBoardId: (id) => set({ activeBoardId: id }),

  removeBoard: (id) => {
    const { boards, activeBoardId } = get();
    const updatedBoards = boards.filter((b) => b.id !== id);

    set({
      boards: updatedBoards,
      activeBoardId:
        activeBoardId === id ? updatedBoards[0]?.id || null : activeBoardId,
    });
  },

  getActiveBoard: () => {
    const { boards, activeBoardId } = get();
    return boards.find((board) => board.id === activeBoardId);
  },

  updateBoard: (updatedBoard) => {
    const { boards, activeBoardId } = get();

    const updatedBoards = boards.map((b) =>
      b.id === updatedBoard.id ? updatedBoard : b,
    );

    set({
      boards: updatedBoards,
    });

    if (activeBoardId === updatedBoard.id) {
      set({ activeBoardId: updatedBoard.id });
    }
  },
}));
