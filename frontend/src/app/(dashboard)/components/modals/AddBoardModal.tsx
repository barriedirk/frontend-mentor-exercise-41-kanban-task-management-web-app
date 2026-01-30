"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBoardSchema } from "@/schemas/board.schema";

import Modal from "@/components/ui/Modal";

import { BoardForm } from "./BoardForm";
import { BoardFormBase } from "@//features/board/types/board-form.types";

interface AddBoardModalProps {
  open: boolean;
  board: BoardFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AddBoardModal({
  open,
  board,
  loading = false,
  onCancel,
  onConfirm,
}: AddBoardModalProps) {
  const formTitleId = useId();

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Add Board"
      onClose={onCancel}
      size="large"
    >
      <BoardForm
        defaultValues={board}
        resolver={zodResolver(addBoardSchema)}
        submitLabel="Create Board"
        onSubmit={async (values) => {
          const parsed = addBoardSchema.parse(values);

          onConfirm();
        }}
      />
    </Modal>
  );
}
