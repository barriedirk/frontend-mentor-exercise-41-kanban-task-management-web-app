"use client";

import { useState } from "react";
import DeleteBoardModal from "@/app/(dashboard)/components/modals/DeleteBoardModal";
import { deleteBoard } from "../services/board.service";
import { Toaster } from "@/components/ui/sonner";

interface DeleteBoardFeatureProps {
  boardId: string;
  boardName: string;
  open: boolean;
  onClose: () => void;
}

export default function DeleteBoardFeature({
  boardId,
  boardName,
  open,
  onClose,
}: DeleteBoardFeatureProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await deleteBoard(boardId);
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
    <DeleteBoardModal
      open={open}
      boardName={boardName}
      loading={loading}
      onCancel={onClose}
      onConfirm={handleDelete}
    />
  );
}
