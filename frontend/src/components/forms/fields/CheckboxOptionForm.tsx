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
  const errorId = `${elemId}-error`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <fieldset
          className={clsx(
            "form-group form-checkbox-group",
            "flex items-center",
            styleName,
            error && "form-group--error",
          )}
          role="group"
          aria-labelledby={`${name}-label`}
        >
          <div
            className={clsx(
              "form-input-group flex items-center gap-2 w-full",
              error && "is-invalid",
            )}
          >
            <input
              data-testid={dataTestid}
              id={inputId}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => {
                e.stopPropagation();

                field.onChange(e.target.checked);
              }}
              className={clsx("form-checkbox", error && "is-invalid")}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />

            {label && (
              <label
                htmlFor={inputId}
                className={clsx("text-body-l cursor-pointer", "w-100")}
              >
                {label}
              </label>
            )}
          </div>
        </fieldset>
      )}
    />
  );
};

export default CheckboxOptionForm;
