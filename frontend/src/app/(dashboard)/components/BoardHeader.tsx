import "./board-header.css";

import Image from "next/image";

import Button from "@/components/ui/Button";

export default function BoardHeader() {
  return (
    <div className="board-header flex justify-center items-center gap-2">
      <Image
        className="board-header__logo object-fit"
        src="/logo-mobile.svg"
        alt="Kanban"
        width={24}
        height={24}
        priority
      />

      <p className="">Platform Launch</p>

      <Button className="board-header__add_task ml-auto text-preset-4">
        <span>+</span>
        <span>Add New Task</span>
      </Button>

      <div className="board-header__menu">
        <button aria-haspopup="menu" aria-expanded="false">
          <Image
            className="board-header__ellipsis object-fit"
            src="/icon-vertical-ellipsis.svg"
            alt="options"
            width={3}
            height={16}
            priority
          />
        </button>

        <ul className="board-header__menu-options" role="menu" hidden>
          <li role="menuitem">
            <button>Edit board</button>
          </li>
          <li role="menuitem">
            <button>Delete board</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
