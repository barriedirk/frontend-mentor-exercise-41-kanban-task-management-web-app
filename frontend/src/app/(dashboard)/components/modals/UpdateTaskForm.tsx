import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
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

const createEmptyTask = () => ({ id: crypto.randomUUID(), name: "" });

interface UpdateTaskFormProps {
  defaultValues: TaskFormBase;
  resolver?: Resolver<TaskFormBase>;
  onSubmit: SubmitHandler<TaskFormBase>;
  submitLabel: string;
}

const columnsMockup: Option[] = [
  {
    value: "01",
    label: "TODO",
  },
  {
    value: "02",
    label: "DONE",
  },
  {
    value: "03",
    label: "REJECT",
  },
];

export default function UpdateTaskForm({
  defaultValues,
  resolver,
  onSubmit,
  submitLabel,
}: UpdateTaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormBase>({
    resolver,
    defaultValues: {
      ...defaultValues,
      subTasks:
        defaultValues.subTasks && defaultValues.subTasks.length > 0
          ? defaultValues.subTasks
          : [createEmptyTask()],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name="name"
        control={control}
        label="Title"
        placeholder="e.g. ACME"
        error={errors.name}
      />
      <TextareaForm
        name="description"
        control={control}
        label="Description"
        placeholder="e.g. ACME"
        error={errors.description}
      />
      <h3 className="form-label text-grey-900">Subtasks</h3>

      <div
        className={clsx(
          "flex flex-col gap-2.5 max-h-35 overflow-y-auto overflow-x-hidden px-1",
          fields.length > 2 && "pr-1",
        )}
      >
        {fields.map((field, index) => (
          <InputOptionForm
            key={field.id}
            name={`subTasks.${index}.name`}
            control={control}
            error={errors.subTasks?.[index]?.name}
            placeholder="Subtask name"
            onRemove={() => remove(index)}
            disabled={fields.length === 1}
          />
        ))}
      </div>
      <Button
        type="button"
        size="small"
        variant="secondary"
        onClick={() => append(createEmptyTask())}
      >
        + Add New Task
      </Button>

      <DropDownForm
        name="columnId"
        control={control}
        label="Status"
        placeholder="e.g. ACME"
        error={errors.columnId}
        options={columnsMockup}
      />

      <Button size="small" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
