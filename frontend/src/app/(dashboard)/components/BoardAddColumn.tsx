"use client";

import "./board-add-column.css";

export default function BoardAddColumn() {
  return (
    <section className="board-column__add-new  h-full px-4">
      <div className="bg-background-tertiary flex justify-center items-center h-full mt-13.75">
        <button className="text-heading-xl text-medium-grey">
          + New Column
        </button>
      </div>
    </section>
  );
}
