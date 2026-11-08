'use client'
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerWithPassword, type RegistrationDetails } from "@/services/auth";
import { getSafeRedirectPath, storeAuthToken } from "@/lib/auth";
import { registrationSchema } from "@/lib/validation/authSchemas";

export function useRegister() {
    const pathname = usePathname();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [regisError, setRegisError] = useState("");
    const throttleRef = useRef<boolean>(false);

    const registerUser = async (values: RegistrationDetails & { confirmPassword: string }) => {
        // Throttle: prevent multiple submissions within 1 second
        if (throttleRef.current) {
            return;
        }

        throttleRef.current = true;
        setRegisError("");

        try {
            const token = await registerWithPassword(values);
            storeAuthToken(token);
            router.replace(getSafeRedirectPath(window.location.search));
        } catch {
            setRegisError("username or email is taken");
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
        setRegisError("");
    };

    return {
        regisSchema: registrationSchema,
        registerUser,
        showPassword,
        togglePasswordVisibility,
        regisError,
        clearError,
        pathname,
    };
}
