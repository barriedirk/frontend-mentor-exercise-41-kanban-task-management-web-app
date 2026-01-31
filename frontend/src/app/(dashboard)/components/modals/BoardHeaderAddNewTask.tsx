"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import AddTaskFeature from "@/features/board/components/AddTaskFeature";

export default function BoardHeaderAddNewTask() {
  const [openAddModal, setOpenAddModal] = useState(false);

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
        onClick={() => setOpenAddModal(true)}
      >
        <span>+</span>
        <span>Add New Task</span>
      </Button>
    </>
  );
}
