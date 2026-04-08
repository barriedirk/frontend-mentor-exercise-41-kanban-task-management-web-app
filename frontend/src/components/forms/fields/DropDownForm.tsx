import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

import Image from "next/image";

import React, { useState, useRef, useEffect, useId, useCallback } from "react";

import clsx from "clsx";

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  placeholder?: string;
  helperText?: string;
  options: Option[];
  dataTestid?: string;
  readonly?: boolean;
}

const DropDownForm = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  placeholder = "Select an option",
  helperText,
  options,
  dataTestid,
  readonly = false,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLFieldSetElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsOpen((prev) => !prev);
  };
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const iconChevron = "/icon-chevron-down.svg";
  const iconCross = "/icon-cross.svg";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
      const optionEl = dropdownRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`,
      ) as HTMLDivElement;

      optionEl?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  const inputId = useId();
  const errorId = `${name}-error`;
  const listboxId = `${name}-listbox`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);

        const handleSelect = (option: Option) => {
          field.onChange(option.value);

          closeDropdown();
        };

        const clearSelection = (e: React.MouseEvent) => {
          e.stopPropagation();
          field.onChange("");

          closeDropdown();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
          switch (e.key) {
            case "ArrowDown":
              e.preventDefault();
              setIsOpen(true);
              setHighlightedIndex((prev) =>
                prev < options.length - 1 ? prev + 1 : 0,
              );
              break;
            case "ArrowUp":
              e.preventDefault();
              setIsOpen(true);
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : options.length - 1,
              );
              break;
            case "Enter":
            case " ":
              e.preventDefault();
              if (isOpen && highlightedIndex >= 0) {
                handleSelect(options[highlightedIndex]);
              } else {
                setIsOpen(true);
              }
              break;
            case "Escape":
              closeDropdown();
              break;
          }
        };

        return (
          <fieldset
            ref={selectRef}
            className={clsx(
              "form-group input-select",
              error && "form-group--error",
              readonly && "opacity-75 cursor-not-allowed",
              "relative",
            )}
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
              role="combobox"
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-owns={listboxId}
              aria-activedescendant={
                isOpen && highlightedIndex >= 0
                  ? `${name}-option-${highlightedIndex}`
                  : undefined
              }
              tabIndex={readonly ? -1 : 0}
              onKeyDown={(e) => {
                if (readonly) return;

                handleKeyDown(e);
              }}
              className={clsx(
                "form-input-group relative",
                readonly ? "cursor-default" : "cursor-pointer",
                "text-body-l",
                !selected && "bg-background-tertiary",
                selected && "bg-background",
                error && "is-invalid",
              )}
              onClick={(e) => {
                if (readonly) return;

                toggleDropdown(e);
              }}
              data-testid={dataTestid ? `${dataTestid}-toggle-dropdown` : null}
            >
              <div
                id={inputId}
                className={clsx(
                  "form-control",
                  error && "is-invalid",
                  "flex items-center gap-2",
                )}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                data-testid={dataTestid ? `${dataTestid}-${inputId}` : null}
              >
                {selected?.icon}
                <span
                  className={clsx(
                    "form-control",
                    !selected?.label ? "text-grey-200" : "text-grey-900",
                  )}
                >
                  {selected?.label || placeholder}
                </span>
              </div>

              {!readonly && (
                <>
                  {selected && (
                    <button
                      type="button"
                      onClick={clearSelection}
                      aria-label="Clear selected option"
                      className="button--simple text-red-500 hover:text-red-550 ml-auto"
                      data-testid={
                        dataTestid ? `${dataTestid}-clear-selection` : null
                      }
                    >
                      <Image
                        className="object-fit w-3 h-3"
                        src={iconCross}
                        alt=""
                        width={15}
                        height={15}
                        priority
                      />
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={toggleDropdown}
                aria-label="Show options"
                className={clsx(
                  "button--simple w-3 h-2",
                  !selected && "ml-auto",
                  readonly && "ml-auto",
                )}
                data-testid={
                  dataTestid
                    ? `${dataTestid}-toggle-dropdown-show-options`
                    : null
                }
              >
                <Image
                  className="object-fit w-3 h-2"
                  src={iconChevron}
                  alt=""
                  width={8}
                  height={4}
                  priority
                />
              </button>
            </div>

            {error && (
              <span id={errorId} role="alert" className="text-preset-4 error">
                {error.message}
              </span>
            )}

            {helperText && (
              <p className="text-preset-4 text-grey-500">{helperText}</p>
            )}

            {isOpen && !readonly && (
              <div
                id={listboxId}
                role="listbox"
                ref={dropdownRef}
                className="select-dropdown bg-background"
                data-testid={
                  dataTestid
                    ? `${dataTestid}-${listboxId}-select-dropdown`
                    : null
                }
              >
                {options.map((option, index) => {
                  const isSelected = field.value === option.value;
                  const isHighlighted = highlightedIndex === index;

                  return (
                    <div
                      key={`${option.value}-option-${index}`}
                      id={`${name}-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      data-index={index}
                      onClick={(e) => {
                        //e.preventDefault();
                        // e.stopPropagation();
                        handleSelect(option);
                      }}
                      data-testid={
                        dataTestid ? `${dataTestid}-option-${index}` : null
                      }
                      className={clsx(
                        "flex cursor-pointer items-center gap-2 px-4 py-2 form-control",
                        isSelected &&
                          "bg-soft-pastel-purple text-dark-grey font-semibold",
                        isHighlighted && "bg-soft-pastel-purple text-dark-grey",
                      )}
                    >
                      {option.icon}
                      {option.label}
                    </div>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      }}
    />
  );
};

export default DropDownForm;
