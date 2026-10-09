'use client'
import Image from "next/image";
import test from "@/assets/Icon.svg";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TfiEmail, TfiEye, TfiLock } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../hooks/useLogin";

export default function LoginComp() {
    const {
        loginSchema,
        loginUser,
        showPassword,
        togglePasswordVisibility,
        loginError,
        clearError,
        pathname,
    } = useLogin();

    const EyeIcon = showPassword ? FaEyeSlash : TfiEye;

    return (
        <div className="flex p-6 w-full justify-center items-center rounded-xl flex-col shadow-2xl bg-white gap-4 md:gap-6 lg:gap-8">
            <div className="flex justify-center items-center gap-4 flex-col">
                <div className="w-16 h-16 bg-primary-store rounded-full flex justify-center items-center">
                    <Image src={test} width={100} height={100} className="w-7.5 h-7.5" alt="avatar logo" />
                </div>

                <div className="flex justify-center items-center gap-1 flex-col text-center">
                    <h3 className="font-semibold text-xl md:text-2xl leading-8">Welcome Back</h3>
                    <p className="text-footer-color leading-6 text-[14px] md:text-[16px]">
                        Enter your details to access your luxury account
                    </p>
                </div>

                <div className="grid grid-cols-2">
                    <Link href="/login" className={`text-footer-color transition-all duration-450 ease-in-out cursor-pointer flex justify-center items-center border-b-2 min-w-37.5 md:min-w-50 border-footer-color/20 ${pathname === "/login" ? "border-footer-primary text-footer-primary hover:text-green-700 hover:border-green-600" : "hover:text-footer-primary/65 hover:border-footer-primary/65"}`}>
                        <p className="mb-3">Login</p>
                    </Link>
                    <Link href="/register" className={`text-footer-color transition-all duration-450 ease-in-out cursor-pointer flex justify-center items-center border-b-2 min-w-37.5 md:min-w-50 border-footer-color/20 ${pathname === "/register" ? "border-footer-primary text-footer-primary hover:text-green-700 hover:border-green-600" : "hover:text-footer-primary/50 hover:border-footer-primary/50"}`}>
                        <p className="mb-3">Register</p>
                    </Link>
                </div>

                <Formik initialValues={{ identifier: '', password: '' }} validationSchema={loginSchema} onSubmit={loginUser}>
                    {({ errors, values }) => (
                        <Form className="flex flex-col w-full gap-4" onChange={clearError}>
                            <div className="email-div relative">
                                <label htmlFor="email" className="text-[12px] font-medium text-footer-color">Email Address</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiEmail className="text-gray-400" />
                                </div>
                                <Field
                                    name="identifier" id="email" type="email" placeholder="name@example.com"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border ${!values.identifier ? 'border-gray-300' : errors.identifier ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <ErrorMessage name="identifier" component="p" className="text-red-600 text-[12px] mt-1" />
                            </div>

                            <div className="password-div relative">
                                <label htmlFor="password" className="text-[12px] font-medium text-footer-color">Password</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiLock className="text-gray-400" />
                                </div>
                                <Field
                                    name="password" id="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border ${!values.password ? 'border-gray-300' : errors.password ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <button
                                    className="absolute cursor-pointer inset-y-13 inset-e-3 flex items-center"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <EyeIcon className="text-gray-400 text-lg" />
                                </button>
                                <ErrorMessage name="password" component="p" className="text-red-600 text-[12px] mt-1" />
                            </div>

                            {loginError && (
                                <p className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-[14px]">{loginError}</p>
                            )}

                            <div className="flex w-full justify-end">
                                <Link className="w-fit text-sm text-footer-primary transition-all duration-300 ease-in-out hover:-translate-y-0.5" href="/forgetpassword">Forgot Password?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={Boolean(errors.identifier || errors.password || !values.identifier || !values.password)}
                                className={`w-full transition-all duration-400 ease-in-out p-3 rounded-lg text-white flex justify-center items-center ${(errors.identifier || errors.password || !values.identifier || !values.password) ? 'bg-gray-300' : 'cursor-pointer bg-primary-store hover:shadow-lg hover:-translate-y-0.5 hover:bg-green-800'}`}
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="flex items-center justify-center gap-4 text-form-gray w-full my-6">
                    <div className="h-px bg-form-gray flex-1"></div>
                    <p className="text-[12px] font-medium whitespace-nowrap">OR CONTINUE WITH</p>
                    <div className="h-px bg-form-gray flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <Link
                        className="border border-form-gray flex justify-center items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                        href="http://localhost:1337/api/connect/google"
                    >
                        <FcGoogle className="text-xl" />
                        <span className="text-[14px] font-semibold text-footer-secondary leading-5">Google</span>
                    </Link>
                    <Link
                        className="border border-form-gray flex justify-center items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                        href=""
                    >
                        <FaApple className="text-xl" />
                        <span className="text-[14px] font-semibold text-footer-secondary leading-5">Apple</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}