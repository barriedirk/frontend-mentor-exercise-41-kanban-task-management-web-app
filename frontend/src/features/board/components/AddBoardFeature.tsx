"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AddBoardModal from "@/app/(dashboard)/components/modals/AddBoardModal";

import { BoardModel } from "../types/board.types";
import { addBoard } from "../services/board.service";

import { boardToForm } from "../mappers/board.mapper";
import { AddBoardValues } from "@/schemas/board.schema";
import { toast } from "sonner";

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
  const router = useRouter();
  const defaultValues = useMemo(() => boardToForm(emptyBoard), []);

  async function handleAdd(values: AddBoardValues) {
    try {
      setLoading(true);

      await addBoard(values);

      toast.success("Board created successfully");

      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create board. Please try again.");
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
      onConfirm={handleAdd}
    />
  );
}
