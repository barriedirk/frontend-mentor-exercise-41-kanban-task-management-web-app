import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
  ArrayPath,
  FieldValues,
  DefaultValues,
  Path,
  FieldError,
} from "react-hook-form";

import clsx from "clsx";

import InputForm from "@/components/forms/fields/InputForm";
import Button from "@/components/ui/Button";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import TextareaForm from "@/components/forms/fields/TextareaForm";
import InputOptionForm from "@/components/forms/fields/InputOptionForm";
import DropDownForm, {
  type Option,
} from "@/components/forms/fields/DropDownForm";
import { BoardColumnModel } from "@/features/board/types/board.types";
import { useMemo } from "react";

const createEmptyTask = () => ({ id: crypto.randomUUID(), name: "" });

type ColumnError = {
  name?: FieldError;
};

interface TaskFormProps<T extends FieldValues & TaskFormBase> {
  defaultValues: T;
  resolver?: Resolver<T>;
  onSubmit: SubmitHandler<T>;
  submitLabel: string;
  status: BoardColumnModel[];
}

export default function TaskForm<T extends FieldValues & TaskFormBase>({
  defaultValues,
  resolver,
  onSubmit,
  submitLabel,
  status,
}: TaskFormProps<T>) {
  const initialValues = useMemo(
    () =>
      ({
        ...defaultValues,
        subTasks:
          defaultValues.subTasks && defaultValues.subTasks.length > 0
            ? defaultValues.subTasks
            : [createEmptyTask()],
      }) as T,
    [defaultValues],
  );

  const options: Option[] = useMemo(() => {
    console.log("status", status);
    return (status || []).map((item) => ({
      value: item.id?.toString() ?? "",
      label: item.name,
    }));
  }, [status]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<T>({
    resolver,
    defaultValues: initialValues as DefaultValues<T>,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks" as ArrayPath<T>,
  });

  const columnErrors = errors.columns as unknown as (ColumnError | undefined)[];

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name={"name" as Path<T>}
        control={control}
        label="Title"
        placeholder="e.g. ACME"
        error={errors.name as FieldError}
        maxLength={30}
      />
      <TextareaForm
        name={"description" as Path<T>}
        control={control}
        label="Description"
        placeholder="e.g. ACME"
        error={errors.description as FieldError}
        maxLength={2000}
      />
      <h3 className="form-label text-grey-900">Subtasks</h3>

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
              name={`subTasks.${index}.name` as Path<T>}
              control={control}
              error={currentColumnError}
              placeholder="Subtask name"
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
        onClick={() =>
          append(createEmptyTask() as Parameters<typeof append>[0])
        }
      >
        + Add New Task
      </Button>

      <DropDownForm
        name={"columnId" as Path<T>}
        control={control}
        label="Status"
        placeholder="e.g. ACME"
        error={errors.columnId as FieldError}
        options={options}
      />
      <Button size="small" type="submit" disabled={!isValid || isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
