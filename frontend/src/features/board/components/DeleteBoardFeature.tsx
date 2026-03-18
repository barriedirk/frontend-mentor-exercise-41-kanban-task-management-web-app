"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import DeleteBoardModal from "@/app/(dashboard)/components/modals/DeleteBoardModal";

import { deleteBoard } from "../services/board.service";
import { toast } from "sonner";
import { useBoardStore } from "../store/useBoardStore";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const removeBoard = useBoardStore((state) => state.removeBoard);

  function handleDelete() {
    const toastId = toast.loading("Deleting board...");

    startTransition(async () => {
      const success = await deleteBoard(boardId);

      console.log("to remove", { boardId, success });

      if (success) {
        toast.success("Board deleted!", { id: toastId });

        removeBoard(boardId);

        onClose();

        router.refresh();
        router.push("/dashboard");
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    });
  }

  return (
    <DeleteBoardModal
      open={open}
      boardName={boardName}
      loading={isPending}
      onCancel={onClose}
      onConfirm={handleDelete}
    />
  );
}
