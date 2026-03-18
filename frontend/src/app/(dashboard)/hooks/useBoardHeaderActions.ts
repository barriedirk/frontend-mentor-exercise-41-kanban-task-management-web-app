import { useState } from "react";
import { useBoardStore } from "@/features/board/store/useBoardStore";

export function useBoardMenuActions() {
  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeBoard = useBoardStore((state) => state.getActiveBoard());

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
  };
}
