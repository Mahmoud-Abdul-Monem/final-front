'use client'

import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeStore } from "@/store/theme";

export default function ThemeToggle() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const theme = useThemeStore((state) => state.theme);

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="cursor-pointer text-white/80 hover:text-white p-2 bg-white/10 rounded-lg transition-all"
        >
            {theme === 'light' ? <BsMoon className="w-5 h-5" /> : <BsSun className="w-5 h-5" />}
        </button>
    );
}
