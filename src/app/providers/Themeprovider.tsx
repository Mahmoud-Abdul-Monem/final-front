"use client";

import { useThemeStore } from "@/store/theme";
import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return <>{children}</>;
}