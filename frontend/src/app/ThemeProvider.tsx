"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { getThemeVariables } from "@/lib/getThemeVariables";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const variables = getThemeVariables()[theme];

    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
