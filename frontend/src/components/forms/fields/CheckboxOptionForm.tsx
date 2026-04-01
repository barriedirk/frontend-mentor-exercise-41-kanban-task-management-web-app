import { useId } from "react";

import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

import clsx from "clsx";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: FieldError;
  styleName?: "column" | "row";
  dataTestid?: string;
}

const CheckboxOptionForm = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  styleName,
  dataTestid,
}: Props<T>) => {
  const elemId = useId();
  const inputId = `${elemId}-checkbox`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isChecked = !!field.value;

        return (
          <div
            className={clsx(
              "flex items-center gap-4 p-3 rounded-md transition-colors cursor-pointer w-full",
              // Estilos dinámicos basados en el estado
              isChecked
                ? "bg-light-grey-light-bg dark:bg-very-dark-grey"
                : "bg-white dark:bg-dark-grey hover:bg-main-purple/10",
              error && "border border-red-500",
            )}
            onClick={() => field.onChange(!isChecked)} // Permite hacer clic en toda la fila
          >
            <input
              data-testid={dataTestid}
              id={inputId}
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                e.stopPropagation();

                field.onChange(e.target.checked);
              }}
              className="accent-main-purple w-4 h-4 cursor-pointer"
            />

            {label && (
              <label
                htmlFor={inputId}
                className={clsx(
                  "text-body-m font-bold cursor-pointer select-none transition-all",
                  isChecked
                    ? "text-medium-grey line-through opacity-50"
                    : "text-black dark:text-white",
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {label}
              </label>
            )}
          </div>
        );
      }}
    />
  );
};

export default CheckboxOptionForm;
