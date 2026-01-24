"use client";

import { BoardModel } from "@/features/board/types/board.types";

import { useId } from "react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  editBoardSchema,
  type EditBoardValues,
} from "@/schemas/editBoard.schema";
import InputForm from "@/components/forms/fields/InputForm";

import { useFocusFirstInput } from "@/lib/hooks/useFocusFirstInput";

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
  } = useForm<EditBoardValues>({
    resolver: zodResolver(editBoardSchema),
    mode: "onTouched",
    defaultValues: {
      id: "",
      name: "",
      shareMode: null,
      shareToken: null,
      columns: [],
    },
  });

  // @todo, implemented
  const onSubmit: SubmitHandler<EditBoardValues> = async (values) => {
    console.log("this method is missing to implement");
  };

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
      </form>
    </Modal>
  );
}
