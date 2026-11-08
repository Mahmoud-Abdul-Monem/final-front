'use client'
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginWithPassword, type LoginCredentials } from "@/services/auth";
import { getSafeRedirectPath, storeAuthToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validation/authSchemas";

export function useLogin() {
    const pathname = usePathname();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const throttleRef = useRef<boolean>(false);

    const loginUser = async (values: LoginCredentials) => {
        // Throttle: prevent multiple submissions within 1 second
        if (throttleRef.current) {
            return;
        }

        throttleRef.current = true;
        setLoginError("");

        try {
            const token = await loginWithPassword(values);
            storeAuthToken(token);
            router.replace(getSafeRedirectPath(window.location.search));
        } catch {
            setLoginError("Email or Password is incorrect");
        } finally {
            setTimeout(() => {
                throttleRef.current = false;
            }, 1000);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const clearError = () => {
        setLoginError("");
    };

    return {
        loginSchema,
        loginUser,
        showPassword,
        togglePasswordVisibility,
        loginError,
        clearError,
        pathname,
    };
}
