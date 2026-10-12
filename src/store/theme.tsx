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
            setTheme: (newTheme) => {
                document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
                set({ theme: newTheme });
            },
            toggleTheme: () =>
                set((state) => {
                    const nextTheme = state.theme === "light" ? "dark" : "light";
                    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000`;
                    return { theme: nextTheme };
                }),
        }),
        {
            name: "theme-storage",
        }
    )
);