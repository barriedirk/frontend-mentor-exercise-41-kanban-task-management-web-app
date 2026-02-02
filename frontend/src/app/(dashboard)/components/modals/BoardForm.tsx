import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
} from "react-hook-form";

import clsx from "clsx";

import InputForm from "@/components/forms/fields/InputForm";
import InputOptionForm from "@/components/forms/fields/InputOptionForm";
import Button from "@/components/ui/Button";

import { BoardFormBase } from "@//features/board/types/board-form.types";

const createEmptyColumn = () => ({ id: crypto.randomUUID(), name: "" });

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
    defaultValues: {
      ...defaultValues,
      columns:
        defaultValues.columns && defaultValues.columns.length > 0
          ? defaultValues.columns
          : [createEmptyColumn()],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

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

      <div
        className={clsx(
          "flex flex-col gap-2.5 max-h-35 overflow-y-auto overflow-x-hidden px-1",
          fields.length > 2 && "pr-1",
        )}
      >
        {fields.map((field, index) => (
          <InputOptionForm
            key={field.id}
            name={`columns.${index}.name`}
            control={control}
            error={errors.columns?.[index]?.name}
            placeholder="Column name"
            onRemove={() => remove(index)}
            disabled={fields.length === 1}
          />
        ))}
      </div>

      <Button
        type="button"
        size="small"
        variant="secondary"
        onClick={() => append(createEmptyColumn())}
      >
        + Add New Column
      </Button>

      <Button size="small" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
