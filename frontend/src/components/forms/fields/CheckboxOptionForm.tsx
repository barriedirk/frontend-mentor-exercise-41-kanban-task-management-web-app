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
    <fieldset
      className={clsx(
        "form-group flex items-center",
        styleName,
        error && "form-group--error",
      )}
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <div
        className={clsx(
          "form-input-group flex items-center gap-2 w-full",
          "bg-background",
          error && "is-invalid",
        )}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <input
                data-testid={dataTestid}
                id={inputId}
                type="checkbox"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className={clsx("form-checkbox", error && "is-invalid")}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
              />

              {label && (
                <label htmlFor={inputId} className="text-body-l cursor-pointer">
                  {label}
                </label>
              )}
            </>
          )}
        />

        {error && (
          <span id={errorId} role="alert" className="text-body-l error">
            {error.message}
          </span>
        )}
      </div>
    </fieldset>
  );
};

export default CheckboxOptionForm;
