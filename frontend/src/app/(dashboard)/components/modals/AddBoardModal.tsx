"use client";

import { useId, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBoardSchema } from "@/schemas/board.schema";
import { Resolver } from "react-hook-form";

import Modal from "@/components/ui/Modal";

import { BoardForm } from "./BoardForm";
import { BoardFormBase } from "@//features/board/types/board-form.types";
import { POSITION_STEP } from "@/lib/constants";
import { SubMenuItem } from "@/features/board/types/sub-menu-item";

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
  const subMenus: SubMenuItem[] = useMemo(
    () => [
      {
        label: "Close Modal",
        onClick: () => {
          onCancel();
        },
      },
    ],
    [onCancel],
  );

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Add Board"
      onClose={onCancel}
      size="large"
      subMenus={subMenus}
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
