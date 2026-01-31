import "./board-header.css";

import Image from "next/image";

import Logo from "@/components/kanban/Logo";

import BoardHeaderMenuOptions from "./BoardHeaderMenuOptions";
import BoardHeaderAddNewTask from "./modals/BoardHeaderAddNewTask";

export default function BoardHeader() {
  const iconChevron = "/icon-chevron-down.svg";

  return (
    <header className="board-header px-2.5 flex justify-center items-center gap-2">
      <div className="board-header__logo flex items-center">
        <Logo className="w-38 h-6.25" />
      </div>
      <Image
        className="board-header__logo-mobile object-fit w-6.25 h-6.25"
        src="/logo-mobile.svg"
        alt="Kanban"
        width={24}
        height={24}
        priority
      />

      <h1 className="board-header__platform text-heading-l flex justify-center gap-2 items-center ">
        Platform Launch
        <button
          type="button"
          aria-label="Open board list"
          aria-expanded="false"
        >
          <Image
            className="board-header__chevron object-fit w-2 h-1"
            src={iconChevron}
            alt="Kanban"
            width={8}
            height={4}
            priority
          />
        </button>
      </h1>

      <BoardHeaderAddNewTask />

      <BoardHeaderMenuOptions />
    </header>
  );
}
