"use client";

import "./board-columns.css";

import { useState } from "react";

import Button from "@/components/ui/Button";
import BoardColumn from "./BoardColumn";

export default function BoardColumns() {
  const [hasColumns, setHasColumns] = useState(true);

  return (
    <div
      className="board-columns pt-2 px-2 overflow-x-scroll [scrollbar-width:none] "
      aria-labelledby="board-columns-title"
    >
      <h2 id="board-columns-title" className="sr-only">
        Board columns
      </h2>
      {!hasColumns && (
        <div className="board-columns__no-data h-full flex flex-col justify-center items-center gap-4">
          <p className="text-heading-l text-medium-grey p-2 max-w-[24rem] text-center">
            This board is empty. Create a new column to get started.
          </p>
          <Button
            className="flex justify-center items-center text-preset-4"
            onClick={() => setHasColumns(true)}
          >
            + Add New Column
          </Button>
        </div>
      )}
      {hasColumns && (
        <section className="board-columns__content h-full">
          <BoardColumn />
          <BoardColumn />
          <BoardColumn />
          <BoardColumn />
        </section>
      )}
    </div>
  );
}
