"use client";

import "./board-columns.css";

import Button from "@/components/ui/Button";
import BoardColumn from "./BoardColumn";
import BoardAddColumn from "./BoardAddColumn";

import { useBoardStore } from "@/features/board/store/useBoardStore";

export default function BoardColumns() {
  const board = useBoardStore((state) => state.activeBoard);

  console.log("BoardColumns", board);

  return (
    <div
      className="board-columns pt-2 px-2 overflow-x-scroll"
      aria-labelledby="board-columns-title"
    >
      <h2 id="board-columns-title" className="sr-only">
        Board columns
      </h2>
      {!board?.columns?.length && (
        <div className="board-columns__no-data h-full flex flex-col justify-center items-center gap-4">
          <p className="text-heading-l text-medium-grey p-2 max-w-[24rem] text-center">
            This board is empty. Create a new column to get started.
          </p>
          <Button
            className="flex justify-center items-center text-preset-4"
            onClick={() => {
              // @Todo Add New Column
            }}
          >
            + Add New Column
          </Button>
        </div>
      )}
      {!!board?.columns?.length && (
        <section className="board-columns__content scrollbar-width-none">
          {board.columns.map((column) => (
            <BoardColumn key={`${column.id}-${column.name}`} column={column} />
          ))}
          <BoardAddColumn />
        </section>
      )}
    </div>
  );
}
