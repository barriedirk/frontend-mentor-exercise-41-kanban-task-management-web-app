"use client";

import { useState } from "react";

import BoardModal from "@/app/(dashboard)/components/modals/EditBoardModal";

import { BoardModel } from "../types/board.types";
import { editBoard } from "../services/board.service";

import { Toaster } from "@/components/ui/sonner";

interface AddBoardFeatureProps {
  board: BoardModel;
  open: boolean;
  onClose: () => void;
}

export default function AddBoardFeature({
  board,
  open,
  onClose,
}: AddBoardFeatureProps) {
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
    <BoardModal
      open={open}
      board={board}
      loading={loading}
      action="edit"
      onCancel={onClose}
      onConfirm={handleDelete}
    />
  );
}
