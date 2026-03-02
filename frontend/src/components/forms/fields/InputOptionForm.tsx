import { useId } from "react";

import Image from "next/image";

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
  type?: string;
  error?: FieldError;
  autoComplete?: string;
  placeholder?: string;
  styleName?: "column" | "row" | undefined;
  dataTestid?: string;
  disabled?: boolean;
  onRemove: () => void;
}

const InputOptionForm = <T extends FieldValues>({
  name,
  control,
  type = "text",
  error,
  autoComplete,
  placeholder,
  styleName,
  dataTestid,
  disabled,
  onRemove,
}: Props<T>) => {
  const elemId = useId();
  const inputId = `${elemId}-input`;
  const errorId = `${elemId}-error`;

  return (
    <fieldset
      className={clsx(
        "form-group form-group--row input-text flex flex-row items-center",
        styleName,
        error && "form-group--error",
      )}
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <div
        className={clsx(
          "form-input-group text-body-l relative w-full",
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
      <button
        type="button"
        className="w-3.5 h-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onRemove}
        disabled={disabled}
      >
        <Image
          className="w-3.5 h-3.5 object-fit"
          src="/icon-cross.svg"
          alt="Remove column"
          width={14}
          height={14}
          priority
        />
      </button>
    </fieldset>
  );
};

export default InputOptionForm;
