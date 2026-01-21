"use client";

import "./board-column.css";

import { useId } from "react";

export default function BoardColumn() {
  const titleId = useId();

  return (
    <section className="board-column h-full px-4" aria-labelledby={titleId}>
      <h3
        className="board-column__title text-heading-s text-medium-grey flex items-center gap-2 p-2 mb-6 [unicode-bidi:isolate]"
        id={titleId}
      >
        <span
          aria-hidden="true"
          className="w-3.75 h-3.75 bg-main-purple rounded-full"
        ></span>
        TODO (4)
      </h3>
      <ul className="board-column__tasks overflow-y-auto flex flex-col gap-6">
        <li>
          <button className="board-column__task flex flex-col gap-3 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Build UI for onboarding flow"
            >
              Build UI for onboarding flow
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Add account management endpoints"
            >
              Add account management endpoints
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
        <li>
          <button className="board-column__task flex flex-col gap-2 text-left p-4 bg-background rounded-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-full">
            <h4
              className="text-heading-m text-foreground [unicode-bidi:isolate]"
              title="Research pricing points of various competitors and trial different business models"
            >
              Research pricing points of various competitors and trial different
              business models
            </h4>
            <p
              className="text-medium-grey text-body-m [unicode-bidi:isolate]"
              title="0 of 3 substasks text-body-m"
            >
              0 of 3 substasks
            </p>
          </button>
        </li>
      </ul>
    </section>
  );
}
