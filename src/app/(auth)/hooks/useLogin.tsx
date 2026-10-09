'use client'
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from 'yup';
import axios from "axios";
import { useTokenStore } from "@/store/token";

export interface LoginValues {
    identifier: string;
    password: string;
}

export function useLogin() {
    const pathname = usePathname();
    const router = useRouter();
    const { setToken } = useTokenStore();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

    const loginSchema = Yup.object().shape({
        identifier: Yup.string().email('wrong email').required('email is required'),
        password: Yup.string().min(6, 'password too short').required('Required'),
    });

    const loginUser = async (values: LoginValues) => {
        setLoginError("");
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: values.identifier,
                password: values.password,
            });
            const token = response.data.jwt;
            setToken(token);
            router.replace('/');
        } catch (error) {
            setLoginError("Email or Password is incorrect");
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