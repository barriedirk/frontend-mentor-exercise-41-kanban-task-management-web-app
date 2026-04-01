"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import AddTaskFeature from "@/features/board/components/AddTaskFeature";

import { useBoardStore } from "@/features/board/store/useBoardStore";

export default function BoardHeaderAddNewTask() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const hasActiveBoard = useBoardStore((state) => state.hasActiveBoard());

  return (
    <>
      {openAddModal && (
        <AddTaskFeature
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      )}
      <Button
        className="board-header__add_task ml-auto text-preset-4"
        disabled={!hasActiveBoard}
        onClick={() => setOpenAddModal(true)}
      >
        <span>+</span>
        <span>Add New Task</span>
      </Button>
    </>
  );
}
