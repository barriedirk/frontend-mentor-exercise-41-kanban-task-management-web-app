import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./utils";

type AuthState = {
  user: null | { id: string; name: string };
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: storage(),
    }
  )
);
