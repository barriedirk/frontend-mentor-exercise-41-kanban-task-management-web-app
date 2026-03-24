"use client";

import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";

import EditBoardModal from "@/app/(dashboard)/components/modals/EditBoardModal";

import { BoardModel } from "../types/board.types";
import { editBoard } from "../services/board.service";

import { EditBoardValues } from "@/schemas/board.schema";

import { boardToForm } from "../mappers/board.mapper";
import { toast } from "sonner";
import { useBoardStore } from "../store/useBoardStore";

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const defaultValues = useMemo(() => boardToForm(board), [board]);

  async function handleEdit(values: EditBoardValues) {
    const toastId = toast.loading("Editing board...");

    console.log('handleEdit', values);

    startTransition(async () => {
      const success = await editBoard(values);

      if (success) {
        toast.success("Board updated successfully!", { id: toastId });

        useBoardStore.getState().updateBoard({
          id: board.id,
          name: values.name,
          columns: values.columns.map((col) => ({
            id: col.id.toString(),
            documentId: col.documentId?.toString() || '',
            name: col.name,
            position: col.position ?? 0,
          })),
          shareToken: board.shareToken,
          shareMode: board.shareMode,
        });

        onClose();
        router.refresh();
      } else {
        toast.error("Failed to update board", { id: toastId });
      }
    });
  }

  return (
    <EditBoardModal
      open={open}
      board={defaultValues}
      loading={isPending}
      onCancel={onClose}
      onConfirm={handleEdit}
    />
  );
}
