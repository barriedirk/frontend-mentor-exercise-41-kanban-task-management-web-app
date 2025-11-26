import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./utils";

export const THEME_VALUES = ["light", "dark"] as const;
export type ThemeType = (typeof THEME_VALUES)[number];

type ThemeState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: ThemeType) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage",
      storage: storage(),
    }
  )
);
