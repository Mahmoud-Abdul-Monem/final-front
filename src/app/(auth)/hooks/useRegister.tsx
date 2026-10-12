'use client'
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from 'yup';
import axios from "axios";

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export function useRegister() {
    const pathname = usePathname();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [regisError, setRegisError] = useState("");

    const regisSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
    });

    const registerUser = async (values: RegisterValues) => {
        setRegisError("");
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            const token = response.data.jwt
            document.cookie = `token=${token}; path=/; max-age=604800`;
            router.replace('/');
        } catch (error) {
            setRegisError("username or email is taken");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const clearError = () => {
        setRegisError("");
    };

    return {
        regisSchema,
        registerUser,
        showPassword,
        togglePasswordVisibility,
        regisError,
        clearError,
        pathname,
    };
}