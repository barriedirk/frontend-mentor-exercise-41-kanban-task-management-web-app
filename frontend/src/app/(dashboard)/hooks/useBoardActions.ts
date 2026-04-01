import { useRef } from "react";
import { getBoardById } from "@/features/board/services/board.service";
import { useBoardStore } from "@/features/board/store/useBoardStore";

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
          setActiveBoard(fullBoard);
        }
      } else {
        console.log(
          `⚡ Race Condition evitada: Descartando respuesta de ${id} porque el usuario cambió a ${lastRequestedIdRef.current}`,
        );
      }
    } catch (error) {
      console.error("Error al cargar el detalle del board:", error);
    } finally {
      if (lastRequestedIdRef.current === id) {
        setLoading(false);
      }
    }
  };

  return { selectBoard };
};
