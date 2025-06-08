import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  email: string | null;
  currentUserId: string | null;
  login: (token: string, email: string, currentUserId: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      currentUserId: null,
      login: (token, email, currentUserId) => set({ token, email, currentUserId}),
      logout: () => set({ token: null, email: null, currentUserId: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
