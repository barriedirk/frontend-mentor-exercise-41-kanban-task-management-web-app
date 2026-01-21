"use client";

import "./board-column.css";

import { useId } from "react";

export default function BoardColumn() {
  const titleId = useId();
  return (
    <section className="board-column" aria-labelledby={titleId}>
      <h3
        className="board-column__title text-heading-s text-medium-grey flex items-center gap-2 p-2"
        id={titleId}
      >
        <span
          aria-hidden="true"
          className="w-3.75 h-3.75 bg-main-purple rounded-full"
        ></span>
        TODO (4)
      </h3>
      <ul className="board-column__tasks">
        <li>
          <button className="board-column__task">
            <h4>Build UI for onboarding flow</h4>
            <p>0 of 3 substasks</p>
          </button>
        </li>
        <li>
          <button className="board-column__task">
            <h4>Build UI for onboarding flow</h4>
            <p>0 of 3 substasks</p>
          </button>
        </li>
      </ul>
    </section>
  );
}
