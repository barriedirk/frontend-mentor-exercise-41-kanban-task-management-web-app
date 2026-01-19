"use client";

import clsx from "clsx";

import { useThemeStore } from "@/store/useThemeStore";
import Image from "next/image";

import "./logo.css";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  const theme = useThemeStore((s) => s.theme);
  const logoPath = theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <Image
      className={clsx("logo-app object-fit", className)}
      src={logoPath}
      alt="Kanban"
      width={153}
      height={26}
      priority
    />
  );
}
