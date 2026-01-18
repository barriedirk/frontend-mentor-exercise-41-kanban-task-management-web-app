import "./board-menu.css";

import Image from "next/image";

import Logo from "@/components/kanban/Logo";
import SwitchTheme from "@/components/kanban/SwitchTheme";
import BoardList from "./BoardList";

export default function BoardMenu() {
  return (
    <aside className="board-menu min-w-65">
      <div className="board-menu__logo flex items-center px-2.5 mb-14">
        <Logo />
      </div>
      <section className="board-menu__list px-2.5">
        <BoardList />
      </section>
      <section className="board-menu__switch-theme px-2.5 mb-8">
        <SwitchTheme className="h-12" />
      </section>
      <div className="board-menu__hide-sidebar text-heading-m px-2.5 flex justify-center items-center mb-12">
        <button
          type="button"
          aria-expanded="true"
          aria-label="Hide sidebar"
          className="flex items-center gap-2"
        >
          <Image
            className="board-menu__sidebar object-fit w-4.5 h-4"
            src="/icon-hide-sidebar.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={16}
            priority
          />
          <span>Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
}
