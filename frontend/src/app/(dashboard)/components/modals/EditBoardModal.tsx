"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBoardSchema, EditBoardValues } from "@/schemas/board.schema";

import Modal from "@/components/ui/Modal";

import { BoardForm } from "./BoardForm";
import { BoardFormBase } from "@//features/board/types/board-form.types";

interface EditBoardModalProps {
  open: boolean;
  board: BoardFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (values: EditBoardValues) => void;
}

export default function EditBoardModal({
  open,
  board,
  loading = false,
  onCancel,
  onConfirm,
}: EditBoardModalProps) {
  const formTitleId = useId();

  // @todo, remove typescript error

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Edit Board"
      onClose={onCancel}
      size="large"
    >
      <BoardForm<EditBoardValues>
        defaultValues={board as EditBoardValues}
        resolver={zodResolver(editBoardSchema)}
        submitLabel="Edit Board"
        onSubmit={async (values) => {
          // @todo, need to imrpove
          const updatePositions = {
            ...values,
            columns: values.columns.map((c, i) => ({
              ...c,
              position: (i + 1) * 10,
            })),
          };

          console.log("updatePositions", updatePositions);

          onConfirm(updatePositions);
        }}
      />
    </Modal>
  );
}
