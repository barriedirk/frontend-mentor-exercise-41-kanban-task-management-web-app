"use client";

import EditBoardFeature from "@/features/board/components/EditBoardFeature";
import { useBoardMenuActions } from "../hooks/useBoardHeaderActions";
import "./board-add-column.css";

export default function BoardAddColumn() {
  const { activeBoard, activeModal, closeModal, openModal } =
    useBoardMenuActions();

  return (
    <>
      {activeModal === "edit" && activeBoard && (
        <EditBoardFeature
          board={activeBoard}
          open={true}
          onClose={closeModal}
        />
      )}

      <section className="board-column__add-new  h-full px-4">
        <div className="bg-background-tertiary flex justify-center items-center h-full mt-13.75">
          <button
            className="text-heading-xl text-medium-grey"
            onClick={() => openModal("edit")}
          >
            + New Column
          </button>
        </div>
      </section>
    </>
  );
}
