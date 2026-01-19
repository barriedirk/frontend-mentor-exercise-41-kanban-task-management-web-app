"use client";

import "./board-menu.css";

import clsx from "clsx";
import { useState } from "react";

import Image from "next/image";

import SwitchTheme from "@/components/kanban/SwitchTheme";
import BoardList from "./BoardList";

export default function BoardMenu() {
  const [showSidebar, setHideSidebar] = useState(true);

  const icon = showSidebar
    ? "/icon-hide-sidebar.svg"
    : "/icon-show-sidebar.svg";

  return (
    <div className={clsx("board-menu", !showSidebar && "is-collapsed")}>
      <aside className="board-menu__main" id="board-menu-main">
        <section className="board-menu__list px-2.5">
          <BoardList />
        </section>
        <section className="board-menu__switch-theme px-2.5 mb-8 mt-auto">
          <SwitchTheme className="h-12" />
        </section>
      </aside>
      <div className="board-menu__hide-sidebar text-heading-m px-2.5 flex justify-center items-center mb-12 mt-auto">
        <button
          type="button"
          aria-expanded={showSidebar}
          aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
          aria-controls="board-menu-main"
          className={clsx(
            "flex items-center gap-2",
            !showSidebar &&
              "bg-main-purple text-white rounded-r-4xl object-fit w-14 h-12 justify-center",
          )}
          onClick={() => setHideSidebar((prev) => !prev)}
        >
          <Image
            className="board-menu__sidebar object-fit w-4.5 h-4"
            src={icon}
            alt=""
            aria-hidden="true"
            width={18}
            height={16}
            priority
          />
          {showSidebar && <span>Hide Sidebar</span>}
        </button>
      </div>
    </div>
  );
}
