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
  label: string;
  type?: string;
  error?: FieldError;
  autoComplete?: string;
  placeholder?: string;
  styleName?: "column" | "row" | undefined;
  helperText?: string;
  dataTestid?: string;
  maxLength?: number;
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  error,
  autoComplete,
  placeholder,
  styleName,
  helperText,
  dataTestid,
  maxLength = 100,
}: Props<T>) => {
  const elemId = useId();
  const inputId = `${elemId}-input`;
  const errorId = `${elemId}-error`;

  return (
    <fieldset
      className={clsx("form-group", styleName, error && "form-group--error")}
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <label
        id={`${name}-label`}
        className={clsx(
          "form-label",
          !error && "text-grey-900",
          error && "text-error",
        )}
        htmlFor={inputId}
      >
        {label}
      </label>

      <div
        className={clsx(
          "form-input-group input-text text-body-l relative",
          error && "is-invalid",
        )}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              data-testid={dataTestid}
              id={inputId}
              type={type}
              {...field}
              maxLength={maxLength}
              autoComplete={autoComplete}
              placeholder={placeholder}
              className={`form-control ${error ? "is-invalid" : ""}`}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
        {error && (
          <span id={errorId} role="alert" className="text-body-l error">
            {error.message}
          </span>
        )}
      </div>
      {helperText && <p className="text-body-l text-grey-500">{helperText}</p>}
    </fieldset>
  );
};

export default InputForm;
