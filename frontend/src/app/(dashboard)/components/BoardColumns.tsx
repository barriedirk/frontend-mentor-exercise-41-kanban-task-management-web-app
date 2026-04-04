"use client";

import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import "./board-columns.css";

import Button from "@/components/ui/Button";
import BoardColumn from "./BoardColumn";
import BoardAddColumn from "./BoardAddColumn";

import { useBoardStore } from "@/features/board/store/useBoardStore";
import { useState } from "react";
import { updateColumnsOrder } from "@/features/board/services/board.service";
import { toast } from "sonner";
import { updateTaskPosition } from "@/features/board/services/task.service";

export default function BoardColumns() {
  const board = useBoardStore((state) => state.activeBoard);
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const [isDraggingColumn, setIsDraggingColumn] = useState(false);

  const setActiveBoard = useBoardStore((state) => state.setActiveBoard);
  const setColumnsInState = useBoardStore((state) => state.setColumnsInState);
  const moveColumnInStore = useBoardStore((state) => state.moveColumnInStore);
  const moveTaskInStore = useBoardStore((state) => state.moveTaskInStore);

  const isSyncing = useBoardStore((state) => state.isSyncing);
  const setIsSyncing = useBoardStore((state) => state.setIsSyncing);

  const onDragStart = (start: DragStart) => {
    if (start.type === "column") {
      setIsDraggingColumn(true);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    setIsDraggingColumn(false);

    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "task") {
      console.log("Moviendo tarea", { source, destination });
      setIsSyncing(true);

      const sourceColId = source.droppableId;
      const destColId = destination.droppableId;

      const boardSnapshot = JSON.parse(JSON.stringify(activeBoard));
      moveTaskInStore(sourceColId, destColId, source.index, destination.index);

      try {
        const movedTaskId = result.draggableId;
        // Calculamos posición (puedes usar la misma lógica de 10, 20, 30)
        const newPosition = (destination.index + 1) * 10;

        const success = await updateTaskPosition({
          taskId: movedTaskId,
          newColumnId: destColId,
          newPosition: newPosition,
        });

        // if (!success) throw new Error();
      } catch (error) {
        setActiveBoard(boardSnapshot);
        toast.error("Error al mover la tarea");
      }

      setIsSyncing(false);
    }

    if (type === "column") {
      setIsSyncing(true);

      const snapshot = [...activeBoard!.columns];
      moveColumnInStore(source.index, destination.index);

      const payload = [...snapshot];
      const [removed] = payload.splice(source.index, 1);
      payload.splice(destination.index, 0, removed);

      const formattedPayload = payload.map((col, i) => ({
        documentId: col.id,
        position: (i + 1) * 10,
      })) as { documentId: string; position: number }[];

      const success = await updateColumnsOrder({
        columns: formattedPayload,
      });

      if (!success) {
        setColumnsInState(snapshot);

        toast.error("No se pudo sincronizar el orden con el servidor");
      }

      setIsSyncing(false);
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <section
                className="board-columns__content scrollbar-width-none"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.columns.map((column, index) => (
                  <BoardColumn
                    key={`${column.id}-${column.name}`}
                    column={column}
                    index={index}
                    isDragDisabled={isSyncing}
                  />
                ))}

                {provided.placeholder}

                {!isDraggingColumn && <BoardAddColumn />}
              </section>
            )}
          </Droppable>
        )}
      </div>
    </DragDropContext>
  );
}
