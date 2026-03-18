"use client";

import { useState } from "react";
import clsx from "clsx";

import BoardIcon from "@/components/icons/BoardIcon";

import AddBoardFeature from "@/features/board/components/AddBoardFeature";

import BoardListButton from "./BoardListButton";
import { useBoardStore } from "@/features/board/store/useBoardStore";

export default function BoardList() {
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const boards = useBoardStore((state) => state.boards);

  const nBoards: number = boards?.length ?? 0;

  const [openAddModal, setOpenAddModal] = useState(false);

  console.log("setActiveBoardId", setActiveBoardId);

  return (
    <>
      {openAddModal && (
        <AddBoardFeature open={true} onClose={() => setOpenAddModal(false)} />
      )}
      <div className="board-list">
        <h2 className="board-list__header text-heading-s text-medium-grey mb-5">
          All Boards ({nBoards})
        </h2>
        <nav className="board-list__items">
          <ul className="flex flex-col gap-2">
            {boards.map((board) => {
              return (
                <li
                  key={board.id}
                  className={clsx(
                    "board-list__item",
                    "text-heading-m flex",
                    "items-center",
                    board.id !== activeBoardId && "text-medium-grey",
                    board.id === activeBoardId && "text-main-purple",
                  )}
                >
                  <BoardListButton
                    board={board}
                    onClick={() => {
                      console.log("active", board.id);
                      setActiveBoardId(board.id!);
                    }}
                  />
                </li>
              );
            })}

            <li className="board-list__item board-list__item--create flex items-center text-main-purple">
              <button
                type="button"
                aria-label="+ Create New Board"
                className="flex items-center gap-2 hover:bg-main-purple rounded-r-4xl py-2.75 px-3 -translate-x-3 w-full hover:text-white overflow-hidden group"
                onClick={() => setOpenAddModal(true)}
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
