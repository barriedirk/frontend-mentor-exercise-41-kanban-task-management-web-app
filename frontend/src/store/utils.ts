import { createJSONStorage } from "zustand/middleware";
import { ssrSafeStorage } from "./constants";

// to avoid hydration issues
export const storage = () =>
  createJSONStorage(() =>
    typeof window !== "undefined" ? localStorage : ssrSafeStorage
  );
