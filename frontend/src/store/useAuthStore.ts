import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "./utils";

interface User {
  id: string;
  name: string;
  email?: string; // Puedes añadir campos opcionales si Strapi los envía
}

type AuthState = {
  user: null | User;
  token: string | null;
  login: (user: User, token: string) => void;
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
    },
  ),
);
