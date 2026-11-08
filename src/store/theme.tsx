import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: "dark",
            setTheme: (newTheme) => set({ theme: newTheme }),
            toggleTheme: () =>
                set((state) => {
                    const nextTheme = state.theme === "light" ? "dark" : "light";
                    return { theme: nextTheme };
                }),
        }),
        {
            name: "theme-storage",
        }
    )
);
