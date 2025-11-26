"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    if (theme === "light") {
      document.documentElement.style.setProperty("--background", "#fff");
      document.documentElement.style.setProperty("--foreground", "#000");
    } else {
      document.documentElement.style.setProperty("--background", "#20212c");
      document.documentElement.style.setProperty("--foreground", "#fff");
    }
  }, [theme]);

  return <>{children}</>;
}
