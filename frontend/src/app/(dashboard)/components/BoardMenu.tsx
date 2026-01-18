import "./board-menu.css";

import Image from "next/image";

import Logo from "@/components/kanban/Logo";
import SwitchTheme from "@/components/kanban/SwitchTheme";

export default function BoardMenu() {
  return (
    <div className="board-menu ">
      <div className="board-menu__logo flex justify-center items-center">
        <Logo />
      </div>
      <div className="board-menu__all-boards">
        <h1>BoardMenu</h1>
      </div>
      <div className="board-menu__switch-theme">
        <SwitchTheme />
      </div>
      <div className="board-menu__hide-sidebar text-heading-m mb-5 flex justify-center items-center ">
        <Image
          className="board-menu__sidebar object-fit w-4.5 h-4"
          src="/icon-hide-sidebar.svg"
          alt="hide sidebar"
          width={18}
          height={16}
          priority
        />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
}
