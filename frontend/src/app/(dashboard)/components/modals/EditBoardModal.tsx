"use client";

import { BoardModel } from "@/features/board/types/board.types";

import { useEffect, useId } from "react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form";

import {
  editBoardSchema,
  type EditBoardValues,
} from "@/schemas/editBoard.schema";
import InputForm from "@/components/forms/fields/InputForm";
import ColumnForm from "@/components/forms/fields/ColumnForm";

import { useFocusFirstInput } from "@/lib/hooks/useFocusFirstInput";
import clsx from "clsx";

interface EditBoardModalProps {
  open: boolean;
  board: BoardModel;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function EditBoardModal({
  open,
  board,
  loading = false,
  onCancel,
  onConfirm,
}: EditBoardModalProps) {
  const containerRef = useFocusFirstInput<HTMLFormElement>();
  const formTitleId = useId();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<EditBoardValues>({
    resolver: zodResolver(editBoardSchema),
    mode: "onTouched",
    defaultValues: board,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  useEffect(() => {
    if (open) reset(board);
  }, [open, board, reset]);

  // @todo, implemented
  const onSubmit: SubmitHandler<EditBoardValues> = async (values) => {
    console.log("this method is missing to implement");
  };

  console.log("board", board);

  const removeColumn = (idColumn: string) => {};

  return (
    <Modal
      open={open}
      titleId={formTitleId}
      title="Edit Board"
      onClose={onCancel}
      size="large"
    >
      <form
        className="flex flex-col gap-5"
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby={formTitleId}
      >
        <InputForm<EditBoardValues>
          name="name"
          control={control}
          label="Board Name"
          type="email"
          error={errors.name}
          autoComplete="name"
          placeholder="e.g. ACME"
          dataTestid="name"
        />
        <h3 className="form-label text-grey-900">Board Columns</h3>
        <div
          className={clsx(
            "flex flex-col gap-2.5 max-h-35 overflow-y-auto overflow-x-hidden px-1",
            fields.length > 2 && "pr-1",
          )}
        >
          {fields.map((column, index) => {
            return (
              <ColumnForm<EditBoardValues>
                key={column.id}
                name={`columns.${index}.name`}
                control={control}
                type="name"
                error={errors.columns?.[index]?.name}
                placeholder="Column name"
                onRemove={() => remove(index)}
              />
            );
          })}
        </div>
        <Button size="small" variant="secondary">
          + Add New Column
        </Button>
        <Button size="small">Save Changes</Button>
      </form>
    </Modal>
  );
}
