"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import DeleteModal from "@/app/(dashboard)/components/modals/DeleteModal";

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

      if (success) {
        toast.success("Board deleted!", { id: toastId });

        removeBoard(boardId);

        onClose();

        router.refresh();
        router.push("/");
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    });
  }

  return (
    <DeleteModal
      title="Delete this board?"
      open={open}
      text={
        <>
          Are you sure you want to delete the &apos;<strong>{boardName}</strong>
          &apos; board? This action will remove all columns and tasks and cannot
          be reversed.
        </>
      }
      loading={isPending}
      onCancel={onClose}
      onConfirm={handleDelete}
    />
  );
}
