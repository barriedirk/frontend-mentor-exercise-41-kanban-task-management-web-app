"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/Modal";
import { BoardForm } from "./BoardForm";
import { addBoardSchema, editBoardSchema } from "@/schemas/board.schema";
import { BoardFormBase } from "../types/board-form.types";
import { BoardModel } from "@/features/board/types/board.types";

interface BoardModalProps {
  open: boolean;
  board?: BoardModel;
  loading?: boolean;
  action: "edit" | "add";
  onCancel: () => void;
  onConfirm: () => void;
}

export default function BoardModal({
  open,
  board,
  loading = false,
  action,
  onCancel,
  onConfirm,
}: BoardModalProps) {
  const formTitleId = useId();

  const isEdit = action === "edit";

  const defaultValues: BoardFormBase = isEdit
    ? {
        name: board?.name ?? "",
        columns:
          board?.columns && board?.columns?.length > 0
            ? board.columns
            : [{ name: "" }],
      }
    : {
        name: "",
        columns: [{ name: "" }],
      };

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title={isEdit ? "Edit Board" : "Add Board"}
      onClose={onCancel}
      size="large"
    >
      <BoardForm
        defaultValues={defaultValues}
        resolver={zodResolver(isEdit ? editBoardSchema : addBoardSchema)}
        submitLabel={isEdit ? "Save Changes" : "Create Board"}
        onSubmit={async (values) => {
          if (isEdit && board) {
            // Edit board
            const parsed = editBoardSchema.parse({
              ...values,
              id: board.id,
            });

            // await updateBoard(parsed);
          } else {
            // Add board
            const parsed = addBoardSchema.parse(values);

            // await createBoard(parsed);
          }

          onConfirm();
        }}
      />
    </Modal>
  );
}
