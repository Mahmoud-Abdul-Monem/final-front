'use client'
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from 'yup';
import { STRAPI_BASE_URL } from "@/lib/strapi";

export interface LoginValues {
    identifier: string;
    password: string;
}

export function useLogin() {
    const pathname = usePathname();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const throttleRef = useRef<boolean>(false);

    const loginSchema = Yup.object().shape({
        identifier: Yup.string().email('wrong email').required('email is required'),
        password: Yup.string().min(6, 'password too short').required('Required'),
    });

    const loginUser = async (values: LoginValues) => {
        // Throttle: prevent multiple submissions within 1 second
        if (throttleRef.current) {
            return;
        }

        throttleRef.current = true;
        setLoginError("");

        try {
            const response = await fetch(`${STRAPI_BASE_URL}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: values.identifier,
                    password: values.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const data = await response.json();
            const token = data.jwt;
            document.cookie = `token=${token}; path=/; max-age=604800`;
            router.replace('/');
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
