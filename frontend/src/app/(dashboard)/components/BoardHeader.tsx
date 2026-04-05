"use client";

import "./board-header.css";

import Logo from "@/components/kanban/Logo";

import Image from "next/image";
import { useState } from "react";

import BoardHeaderMenu from "./BoardHeaderMenu";
import BoardHeaderAddNewTask from "./modals/BoardHeaderAddNewTask";

import Modal from "@/components/ui/Modal";
import BoardList from "./BoardList";
import SwitchTheme from "@/components/kanban/SwitchTheme";
import { useWidthViewPort } from "@/lib/hooks/useWidthViewPort";
import { TABLET_BREAK } from "@/lib/constants";
import clsx from "clsx";

export default function BoardHeader() {
  const [showBoardModal, setShowBoardModal] = useState(false);
  const innerWidth = useWidthViewPort();
  const isTablet = innerWidth >= TABLET_BREAK;
  const iconChevron = isTablet
    ? "/icon-chevron-up.svg"
    : "/icon-chevron-down.svg";

  if (showBoardModal && isTablet) {
    setShowBoardModal(false);
  }

  return (
    <>
      {showBoardModal && (
        <Modal
          open={true}
          title=""
          onClose={() => setShowBoardModal(false)}
          size="small"
        >
          <section className=" px-2.5">
            <BoardList optionWasClicked={() => setShowBoardModal(false)} />
          </section>
          <section className="board-menu__switch-theme px-2.5 mb-8 mt-auto">
            <SwitchTheme className="h-12" />
          </section>
        </Modal>
      )}

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
          <button
            type="button"
            aria-label="Open board list"
            aria-expanded="false"
            className={clsx(
              "flex items-center",
              isTablet && "pointer-events-none",
            )}
            onClick={() => !isTablet && setShowBoardModal(true)}
          >
            Platform Launch
            <Image
              className="board-header__chevron ml-2 object-fit w-2.5 h-1.5"
              src={iconChevron}
              alt="Kanban"
              width={8}
              height={4}
              priority
            />
          </button>
        </h1>

        <BoardHeaderAddNewTask />

        <BoardHeaderMenu />
      </header>
    </>
  );
}
