"use client";

import BoardIcon from "@/components/icons/BoardIcon";
import { useState } from "react";

import AddBoardFeature from "@/features/board/components/AddBoardFeature";
import { BoardModelBase } from "@/features/board/types/board.types";
import BoardListButton from "./BoardListButton";

const boardsMockup: BoardModelBase[] = [
  {
    id: "001",
    name: "Platform Launch",
  },
  {
    id: "002",
    name: "Roadmap",
  },
];

export default function BoardList() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const addNewBoard = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      {openAddModal && <AddBoardFeature open={true} onClose={() => {}} />}
      <div className="board-list">
        <h2 className="board-list__header text-heading-s text-medium-grey mb-5">
          All Boards ({boardsMockup.length})
        </h2>
        <nav className="board-list__items">
          <ul className="flex flex-col gap-2">
            {boardsMockup.map((board) => {
              return (
                <li
                  key={board.id}
                  className="board-list__item text-heading-m flex items-center text-medium-grey"
                >
                  <BoardListButton board={board} />
                </li>
              );
            })}

            <li className="board-list__item board-list__item--create flex items-center text-main-purple">
              <button
                type="button"
                aria-label="+ Create New Board"
                className="flex items-center gap-2 hover:bg-main-purple rounded-r-4xl py-2.75 px-3 -translate-x-3 w-full hover:text-white overflow-hidden group"
                onClick={addNewBoard}
              >
                <BoardIcon className="board-list__icon object-fit w-4 h-4 group-hover:text-white" />
                + Create New Board
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
