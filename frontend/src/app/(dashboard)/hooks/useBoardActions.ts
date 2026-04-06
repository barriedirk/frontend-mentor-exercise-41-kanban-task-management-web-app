import { useRef } from "react";
import { getBoardById } from "@/features/board/services/board.service";
import { useBoardStore } from "@/features/board/store/useBoardStore";
import { orderColumnsTaskBoard } from "@/features/board/store/utils";

export const useBoardActions = () => {
  const setActiveBoard = useBoardStore((state) => state.setActiveBoard);
  const setLoading = useBoardStore((state) => state.setLoading);
  const lastRequestedIdRef = useRef<string | null>(null);

  const selectBoard = async (id: string) => {
    lastRequestedIdRef.current = id;

    setLoading(true);

    try {
      const fullBoard = await getBoardById(id);

      if (lastRequestedIdRef.current === id) {
        if (fullBoard) {
          setActiveBoard(orderColumnsTaskBoard(fullBoard));
        }
      } else {
        console.log(
          `Race Condition avoided: Discarding response from ${id} because the user switched to ${lastRequestedIdRef.current}`,
        );
      }
    } catch (error) {
      console.error("Error loading board details:", error);
    } finally {
      if (lastRequestedIdRef.current === id) {
        setLoading(false);
      }
    }
  };

  return { selectBoard };
};
