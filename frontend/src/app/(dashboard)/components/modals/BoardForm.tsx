import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
} from "react-hook-form";

import InputForm from "@/components/forms/fields/InputForm";
import ColumnForm from "@/components/forms/fields/ColumnForm";
import Button from "@/components/ui/Button";
import { BoardFormBase } from "../types/board-form.types";

interface BoardFormProps {
  defaultValues: BoardFormBase;
  resolver: Resolver<BoardFormBase>;
  onSubmit: SubmitHandler<BoardFormBase>;
  submitLabel: string;
}

export function BoardForm({
  defaultValues,
  resolver,
  onSubmit,
  submitLabel,
}: BoardFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BoardFormBase>({
    resolver,
    defaultValues,
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name="name"
        control={control}
        label="Board Name"
        placeholder="e.g. ACME"
        error={errors.name}
      />

      <h3 className="form-label text-grey-900">Board Columns</h3>

      <div className="flex flex-col gap-2.5 max-h-35 overflow-y-auto">
        {fields.map((field, index) => (
          <ColumnForm
            key={field.id}
            name={`columns.${index}.name`}
            control={control}
            error={errors.columns?.[index]?.name}
            placeholder="Column name"
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <Button
        type="button"
        size="small"
        variant="secondary"
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            name: "",
          })
        }
      >
        + Add New Column
      </Button>

      <Button size="small" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
