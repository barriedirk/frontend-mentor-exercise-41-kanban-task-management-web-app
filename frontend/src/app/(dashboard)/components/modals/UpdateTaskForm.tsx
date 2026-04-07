import { useEffect, useRef } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Resolver,
  useWatch,
} from "react-hook-form";

import clsx from "clsx";
import { TaskFormBase } from "@/features/board/types/task-form.types";
import CheckboxOptionForm from "@/components/forms/fields/CheckboxOptionForm";
import DropDownForm, {
  type Option,
} from "@/components/forms/fields/DropDownForm";
import { BoardColumnModel } from "@/features/board/types/board.types";
import { useMemo } from "react";
import Spinner from "@/components/ui/Spinner";

interface UpdateTaskFormProps {
  defaultValues: TaskFormBase;
  status?: BoardColumnModel[] | undefined;
  resolver?: Resolver<TaskFormBase>;
  onSubmit: SubmitHandler<TaskFormBase>;
  isLoading?: boolean;
}

export default function UpdateTaskForm({
  defaultValues,
  status,
  resolver,
  onSubmit,
  isLoading = false,
}: UpdateTaskFormProps) {
  const options: Option[] = useMemo(() => {
    return (status || []).map((item) => ({
      value: item.id?.toString() ?? "",
      label: item.name,
    }));
  }, [status]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormBase>({
    resolver,
    defaultValues: defaultValues,
    mode: "onSubmit",
  });

  const watchedValues = useWatch({
    control,
    name: ["subTasks", "columnId"],
  });

  const isFirstRender = useRef(true);

  const lastSavedValue = useRef(
    JSON.stringify([defaultValues.subTasks, defaultValues.columnId]),
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentValuesString = JSON.stringify(watchedValues);

    if (currentValuesString === lastSavedValue.current) {
      return;
    }

    const timer = setTimeout(() => {
      handleSubmit((data) => {
        lastSavedValue.current = JSON.stringify([data.subTasks, data.columnId]);

        onSubmit(data);
      })();
    }, 1000);

    return () => clearTimeout(timer);
  }, [watchedValues, handleSubmit, onSubmit]);

  const { fields } = useFieldArray({
    control,
    name: "subTasks",
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-body-l text-medium-grey">
        {defaultValues.description}
      </p>

      <h3 className="form-label flex">
        Subtasks
        {!isLoading && <Spinner className="h-4 w-4 ml-2" />}
      </h3>

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
            name={`subTasks.${index}.completed`}
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
        options={options}
      />
    </form>
  );
}
