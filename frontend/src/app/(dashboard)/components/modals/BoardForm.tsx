import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
  FieldValues,
  Path,
  ArrayPath,
  DefaultValues,
  FieldError,
} from "react-hook-form";

import clsx from "clsx";

import { useMemo } from "react";

import InputForm from "@/components/forms/fields/InputForm";
import InputOptionForm from "@/components/forms/fields/InputOptionForm";
import Button from "@/components/ui/Button";

import { BoardFormBase } from "@//features/board/types/board-form.types";
import { getTempNewId } from "./utils";
import Spinner from "@/components/ui/Spinner";

type ColumnError = {
  name?: FieldError;
};

interface BoardFormProps<T extends FieldValues & BoardFormBase> {
  defaultValues: T;
  resolver: Resolver<T>;
  onSubmit: SubmitHandler<T>;
  submitLabel: string;
  isLoading?: boolean;
}

const createEmptyColumn = () => ({
  id: getTempNewId(),
  name: "",
  position: 0,
});

export function BoardForm<T extends FieldValues & BoardFormBase>({
  defaultValues,
  resolver,
  onSubmit,
  submitLabel,
  isLoading = false,
}: BoardFormProps<T>) {
  const initialValues = useMemo(
    () =>
      ({
        ...defaultValues,
        columns:
          defaultValues.columns && defaultValues.columns.length > 0
            ? defaultValues.columns
            : [createEmptyColumn()],
      }) as T,
    [defaultValues],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<T>({
    resolver,
    defaultValues: initialValues as DefaultValues<T>,
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns" as ArrayPath<T>,
  });

  const columnErrors = errors.columns as unknown as (ColumnError | undefined)[];

  const isWorking = isSubmitting || isLoading;

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name={"name" as Path<T>}
        control={control}
        label="Board Name"
        placeholder="e.g. ACME"
        error={errors.name as FieldError}
        maxLength={30}
      />

      <h3 className="form-label text-grey-900">Board Columns</h3>

      <div
        className={clsx(
          "flex flex-col gap-2.5 max-h-35 overflow-y-auto overflow-x-hidden px-1",
          fields.length > 2 && "pr-1",
        )}
      >
        {fields.map((field, index) => {
          const currentColumnError = columnErrors?.[index]?.name;

          return (
            <InputOptionForm
              key={field.id}
              name={`columns.${index}.name` as Path<T>}
              control={control}
              error={currentColumnError}
              placeholder="Column name"
              onRemove={() => remove(index)}
              disabled={fields.length === 1}
            />
          );
        })}
      </div>

      <Button
        type="button"
        size="small"
        variant="secondary"
        disabled={!isLoading}
        onClick={() =>
          append(createEmptyColumn() as Parameters<typeof append>[0])
        }
      >
        + Add New Column
      </Button>

      <Button size="small" type="submit" disabled={!isValid || isWorking}>
        {isWorking && <Spinner className="h-4 w-4" />}
        {isWorking ? "Creating..." : submitLabel}
      </Button>
    </form>
  );
}
