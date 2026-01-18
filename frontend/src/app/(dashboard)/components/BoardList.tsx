import BoardIcon from "@/components/icons/BoardIcon";

export default function BoardList() {
  return (
    <div className="board-list">
      <h2 className="board-list__header text-heading-s text-medium-grey mb-5">
        All Boards (3)
      </h2>
      <nav className="board-list__items">
        <ul className="flex flex-col gap-2">
          <li className="board-list__item text-heading-m flex items-center text-medium-grey">
            <button
              type="button"
              aria-current="page"
              className="flex items-center gap-2 hover:bg-main-purple rounded-r-4xl py-2.75 px-3 -translate-x-3 w-full hover:text-white overflow-hidden group"
            >
              <BoardIcon className="board-list__icon w-4 h-4 group-hover:text-white" />
              Platform Launch
            </button>
          </li>
          <li className="board-list__item text-heading-m flex items-center text-medium-grey">
            <button
              type="button"
              aria-current={undefined}
              className="flex items-center gap-2 hover:bg-main-purple rounded-r-4xl py-2.75 px-3 -translate-x-3 w-full hover:text-white overflow-hidden group"
            >
              <BoardIcon className="board-list__icon w-4 h-4 group-hover:text-white" />
              Roadmap
            </button>
          </li>
          <li className="board-list__item board-list__item--create flex items-center text-main-purple">
            <button
              type="button"
              aria-label="+ Create New Board"
              className="flex items-center gap-2 hover:bg-main-purple rounded-r-4xl py-2.75 px-3 -translate-x-3 w-full hover:text-white overflow-hidden group"
            >
              <BoardIcon className="board-list__icon object-fit w-4 h-4 group-hover:text-white" />
              + Create New Board
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
