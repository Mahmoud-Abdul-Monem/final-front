import { create } from "zustand";

interface TokenState {
    token: string | null;
    setToken: (newValue: string) => void;
    clearToken: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
    token: null,
    setToken: (newValue) => set({ token: newValue }),
    clearToken: () => set({ token: null }),
}));