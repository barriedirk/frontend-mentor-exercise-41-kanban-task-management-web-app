"use client";

import "./switch-theme.css";

import clsx from "clsx";

import Image from "next/image";

import { useThemeStore } from "@/store/useThemeStore";

interface SwitchThemeProps {
  className?: string;
}

export default function SwitchTheme({ className }: SwitchThemeProps) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isLight = theme === "light";

  return (
    <div
      className={clsx(
        "switch-theme flex flex-row justify-center items-center gap-7 p-2",
        className,
      )}
    >
      <span className="icon-sun">
        <Image
          src="/icon-light-theme.svg"
          alt="icon Light"
          width={18}
          height={18}
        />
      </span>

      <div className="checkbox-switch">
        <label
          className="switch relative inline-flex items-center cursor-pointer"
          htmlFor="theme-toggle"
        >
          <input
            type="checkbox"
            id="theme-toggle"
            checked={!isLight}
            onChange={toggleTheme}
            aria-label="Toggle between dark and light mode"
          />
          <span className="slider round"></span>
        </label>
      </div>

      <span className="icon-moon">
        <Image
          src="/icon-dark-theme.svg"
          alt="icon Light"
          width={18}
          height={18}
        />
      </span>
    </div>
  );
}
