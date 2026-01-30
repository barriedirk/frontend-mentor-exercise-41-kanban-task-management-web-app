"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBoardSchema } from "@/schemas/board.schema";

import Modal from "@/components/ui/Modal";

import { BoardForm } from "./BoardForm";
import { BoardFormBase } from "@//features/board/types/board-form.types";

interface BoardModalProps {
  open: boolean;
  board: BoardFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function BoardModal({
  open,
  board,
  loading = false,
  onCancel,
  onConfirm,
}: BoardModalProps) {
  const formTitleId = useId();

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Edit Board"
      onClose={onCancel}
      size="large"
    >
      <BoardForm
        defaultValues={board}
        resolver={zodResolver(editBoardSchema)}
        submitLabel="Create Board"
        onSubmit={async (values) => {
          const parsed = editBoardSchema.parse(values);

          onConfirm();
        }}
      />
    </Modal>
  );
}
