import { useState } from "react";
import { useBoardStore } from "@/features/board/store/useBoardStore";

export function useBoardMenuActions() {
  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasActiveBoard = useBoardStore((state) => state.hasActiveBoard());
  const activeBoard = useBoardStore((state) => state.activeBoard);

  const openModal = (type: "edit" | "delete") => {
    setActiveModal(type);
    setIsMenuOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  return {
    activeBoard,
    isMenuOpen,
    setIsMenuOpen,
    activeModal,
    openModal,
    closeModal,
    hasActiveBoard,
  };
}
