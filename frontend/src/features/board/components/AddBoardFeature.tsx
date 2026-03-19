"use client";

import { useMemo, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const defaultValues = useMemo(() => boardToForm(emptyBoard), []);

  async function handleAdd(values: AddBoardValues) {
    const toastId = toast.loading("Adding board...");

    startTransition(async () => {
      const success = await addBoard(values);

      if (success) {
        toast.success("Board created successfully", { id: toastId });

        onClose();
        router.refresh();
      } else {
        toast.error("Failed to create board. Please try again.", {
          id: toastId,
        });
      }
    });
  }

  return (
    <AddBoardModal
      open={open}
      board={defaultValues}
      loading={isPending}
      onCancel={onClose}
      onConfirm={handleAdd}
    />
  );
}
