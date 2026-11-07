'use client'

import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeStore } from "@/store/theme";

export default function ThemeToggle() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative cursor-pointer text-white/80 hover:text-white p-2 bg-white/10 hover:bg-white/15 rounded-lg transition-colors duration-300 w-9 h-9 flex items-center justify-center overflow-hidden"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun Icon */}
                <BsSun
                    className={`absolute w-5 h-5 text-amber-300 transition-all duration-500 ease-in-out transform ${
                        isDark
                            ? 'rotate-0 scale-100 opacity-100'
                            : 'rotate-90 scale-0 opacity-0 pointer-events-none'
                    }`}
                />
                {/* Moon Icon */}
                <BsMoon
                    className={`absolute w-5 h-5 text-white transition-all duration-500 ease-in-out transform ${
                        isDark
                            ? '-rotate-90 scale-0 opacity-0 pointer-events-none'
                            : 'rotate-0 scale-100 opacity-100'
                    }`}
                />
            </div>
        </button>
    );
}
