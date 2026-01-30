"use client";

import { useMemo, useState } from "react";

import AddBoardModal from "@/app/(dashboard)/components/modals/AddBoardModal";

import { BoardModel } from "../types/board.types";
import { addBoard } from "../services/board.service";

import { Toaster } from "@/components/ui/sonner";
import { boardToForm } from "../mappers/board.mapper";

interface AddBoardFeatureProps {
  open: boolean;
  onClose: () => void;
}

const emptyBoard: BoardModel = {
  id: "",
  name: "",
  shareToken: null,
  shareMode: null,
  columns: [{ id: crypto.randomUUID(), name: "" }],
};

export default function AddBoardFeature({
  open,
  onClose,
}: AddBoardFeatureProps) {
  const [loading, setLoading] = useState(false);
  const defaultValues = useMemo(() => boardToForm(emptyBoard), []);

  async function handleDelete() {
    try {
      setLoading(true);
      // await editBoard(board.id);
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
    <AddBoardModal
      open={open}
      board={defaultValues}
      loading={loading}
      onCancel={onClose}
      onConfirm={handleDelete}
    />
  );
}
