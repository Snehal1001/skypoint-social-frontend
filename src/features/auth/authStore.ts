import { create } from "zustand";

type AuthState = {
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  email: null,
  login: (token, email) => set({ token, email }),
  logout: () => set({ token: null, email: null }),
}));
