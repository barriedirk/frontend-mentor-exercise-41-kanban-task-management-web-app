import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
} from "react-hook-form";

import clsx from "clsx";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import CheckboxOptionForm from "@/components/forms/fields/CheckboxOptionForm";
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
      <p className="text-body-l text-medium-grey">
        {defaultValues.description}
      </p>

      <h3 className="form-label text-grey-900">Subtasks</h3>

      <div
        className={clsx(
          "flex flex-col gap-2.5 max-h-48 overflow-y-auto overflow-x-hidden px-1",
          fields.length > 2 && "pr-1",
        )}
      >
        {fields.map((field, index) => (
          <CheckboxOptionForm
            key={field.id}
            label={field.name}
            name={`subTasks.${index}.name`}
            control={control}
            error={errors.subTasks?.[index]?.name}
          />
        ))}
      </div>

      <DropDownForm
        name="columnId"
        control={control}
        label="Current Status"
        placeholder="e.g. ACME"
        error={errors.columnId}
        options={columnsMockup}
      />
    </form>
  );
}
