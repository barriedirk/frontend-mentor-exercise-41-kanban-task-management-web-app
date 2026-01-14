"use client";

import { useThemeStore } from "@/store/useThemeStore";
import Image from "next/image";

import "./logo.css";

export default function Logo() {
  const theme = useThemeStore((s) => s.theme);
  const logoPath = theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <Image
      className="logo-app object-fit"
      src={logoPath}
      alt="Kanban"
      width={153}
      height={26}
      priority
    />
  );
}
