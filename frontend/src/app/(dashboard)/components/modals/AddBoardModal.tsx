"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBoardSchema } from "@/schemas/board.schema";
import { Resolver } from "react-hook-form";

import Modal from "@/components/ui/Modal";

import { BoardForm } from "./BoardForm";
import { BoardFormBase } from "@//features/board/types/board-form.types";
import { POSITION_STEP } from "@/lib/constants";

interface AddBoardModalProps {
  open: boolean;
  board: BoardFormBase;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (values: BoardFormBase) => void;
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
        resolver={
          zodResolver(addBoardSchema) as unknown as Resolver<BoardFormBase>
        }
        isLoading={loading}
        submitLabel="Create Board"
        onSubmit={async (values) => {
          const updatePositions = {
            ...values,
            columns: values.columns.map((c, i) => ({
              ...c,
              position: (i + 1) * POSITION_STEP,
            })),
          };

          onConfirm(updatePositions);
        }}
      />
    </Modal>
  );
}
