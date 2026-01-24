"use client";

import { useState } from "react";

import EditBoardModal from "@/app/(dashboard)/components/modals/EditBoardModal";

import { BoardModel } from "../types/board.types";
import { editBoard } from "../services/board.service";

import { Toaster } from "@/components/ui/sonner";

interface EditBoardFeatureProps {
  board: BoardModel;
  open: boolean;
  onClose: () => void;
}

export default function EditBoardFeature({
  board,
  open,
  onClose,
}: EditBoardFeatureProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await editBoard(board.id);
      // toast.success("Board deleted");
      onClose();
      // later: router.push("/boards") or refresh
    } catch (error) {
      // toast.error("Failed to delete board");
    } finally {
      setLoading(false);
    }
  }

  return (
    <EditBoardModal
      open={open}
      board={board}
      loading={loading}
      onCancel={onClose}
      onConfirm={handleDelete}
    />
  );
}
