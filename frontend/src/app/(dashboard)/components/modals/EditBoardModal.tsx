"use client";

import { useId, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBoardSchema, EditBoardValues } from "@/schemas/board.schema";

import Modal from "@/components/ui/Modal";

import { BoardForm } from "./BoardForm";
import { BoardFormBase } from "@//features/board/types/board-form.types";
import { SubMenuItem } from "@/features/board/types/sub-menu-item";

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
      title="Edit Board"
      onClose={onCancel}
      subMenus={subMenus}
      size="large"
    >
      <BoardForm<EditBoardValues>
        isLoading={loading}
        defaultValues={board as EditBoardValues}
        resolver={zodResolver(editBoardSchema)}
        submitLabel="Edit Board"
        onSubmit={async (values) => {
          onConfirm(values);
        }}
      />
    </Modal>
  );
}
