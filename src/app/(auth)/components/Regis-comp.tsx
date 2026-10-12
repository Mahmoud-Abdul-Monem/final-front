'use client'
import Image from "next/image";
import test from "@/assets/Icon.svg";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TfiEmail, TfiEye, TfiLock } from "react-icons/tfi";
import { FaEyeSlash } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import { useRegister } from "../hooks/useRegister";

export default function RegisComp() {
    const {
        regisSchema,
        registerUser,
        showPassword,
        togglePasswordVisibility,
        regisError,
        clearError,
        pathname,
    } = useRegister();

    const EyeIcon = showPassword ? FaEyeSlash : TfiEye;

    return (
        <div className="flex p-6 w-full justify-center items-center rounded-xl flex-col shadow-2xl bg-white dark:bg-dark-theme gap-4 md:gap-6 lg:gap-8">
            <div className="flex justify-center items-center gap-3 flex-col">
                {/* تأثير الشعاع (Glow) حول أيقونة البروفايل */}
                <div className="w-16 h-16 bg-primary-store rounded-full flex justify-center items-center shadow-[0_0_20px_rgba(16,185,129,0.4)] dark:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                    <Image src={test} width={100} height={100} className="w-7.5 h-7.5" alt="avatar logo" />
                </div>

                <div className="flex justify-center flex-wrap items-center gap-1 flex-col text-center">
                    <h3 className="font-semibold text-xl md:text-2xl leading-8 text-black dark:text-white">Create Account</h3>
                    <p className="text-footer-color leading-6 text-[14px] md:text-[16px] max-w-62.5 dark:text-white/80">
                        Join Luminous Marketplace for an elevated shopping experience.
                    </p>
                </div>

                <div className="grid grid-cols-2">
                    {/* تعديل الـ Underline والـ Hover للعناصر غير النشطة لتضيء */}
                    <Link href="/login" className={`text-footer-color dark:text-white/80 transition-all duration-450 ease-in-out cursor-pointer flex justify-center items-center border-b-2 min-w-37.5 md:min-w-50 border-footer-color/20 ${pathname === "/login" ? "border-primary-store text-primary-store dark:text-white font-semibold" : "hover:text-primary-store hover:border-primary-store/50"}`}>
                        <p className="mb-3">Login</p>
                    </Link>
                    <Link href="/register" className={`text-footer-color dark:text-white/80 transition-all duration-450 ease-in-out cursor-pointer flex justify-center items-center border-b-2 min-w-37.5 md:min-w-50 border-footer-color/20 ${pathname === "/register" ? "border-primary-store text-primary-store dark:text-white font-semibold" : "hover:text-primary-store hover:border-primary-store/50"}`}>
                        <p className="mb-3">Register</p>
                    </Link>
                </div>

                <Formik initialValues={{ username: '', email: '', password: '', confirmPassword: '' }} validationSchema={regisSchema} onSubmit={registerUser}>
                    {({ errors, values }) => (
                        <Form className="flex flex-col w-full gap-4" onChange={clearError}>
                            <div className="username-div relative">
                                <label htmlFor="name" className="text-[12px] font-medium text-footer-color dark:text-white/80">Full Name</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <LuUserRound className="text-gray-400" />
                                </div>
                                <Field
                                    name="username" id="name" type="text" placeholder="e.g. Jane Doe"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border dark:bg-gray-800 dark:text-white ${!values.username ? 'border-gray-300 dark:border-gray-700' : errors.username ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <ErrorMessage name="username" component="p" className="text-red-600 text-[12px] mt-1" />
                            </div>

                            <div className="email-div relative">
                                <label htmlFor="email" className="text-[12px] font-medium text-footer-color dark:text-white/80">Email Address</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiEmail className="text-gray-400" />
                                </div>
                                <Field
                                    name="email" id="email" type="email" placeholder="name@example.com"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border dark:bg-gray-800 dark:text-white ${!values.email ? 'border-gray-300 dark:border-gray-700' : errors.email ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <ErrorMessage name="email" component="p" className="text-red-600 text-[12px] mt-1" />
                            </div>

                            <div className="password-div relative">
                                <label htmlFor="password" className="text-[12px] font-medium text-footer-color dark:text-white/80">Password</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiLock className="text-gray-400" />
                                </div>
                                <Field
                                    name="password" id="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border dark:bg-gray-800 dark:text-white ${!values.password ? 'border-gray-300 dark:border-gray-700' : errors.password ? 'border-red-600' : 'border-green-600'}`}
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

                            <div className="password-div relative">
                                <label htmlFor="confirm-pass" className="text-[12px] font-medium text-footer-color dark:text-white/80">confirm password</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiLock className="text-gray-400" />
                                </div>
                                <Field
                                    name="confirmPassword" id="confirm-pass" type={showPassword ? "text" : "password"} placeholder="••••••••"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border dark:bg-gray-800 dark:text-white ${!values.confirmPassword ? 'border-gray-300 dark:border-gray-700' : errors.confirmPassword ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <button
                                    className="absolute cursor-pointer inset-y-13 inset-e-3 flex items-center"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <EyeIcon className="text-gray-400 text-lg" />
                                </button>
                                <ErrorMessage name="confirmPassword" component="p" className="text-red-600 text-[12px] mt-1" />
                            </div>

                            {regisError && (
                                <p className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-[14px]">{regisError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={Boolean(errors.password || errors.email || errors.username || errors.confirmPassword || !values.username || !values.password || !values.confirmPassword || !values.email)}
                                className={`w-full transition-all duration-400 ease-in-out p-3 rounded-lg text-white flex justify-center text-[14px] leading-5 font-semibold items-center ${errors.password || errors.email || errors.username || errors.confirmPassword || !values.username || !values.password || !values.confirmPassword || !values.email ? 'bg-gray-400 dark:bg-gray-700' : 'cursor-pointer bg-primary-store hover:shadow-lg hover:-translate-y-0.5 hover:bg-green-800 border-green-600'}`}
                            >
                                Create Account
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="max-w-[384px] text-4 leading-6 flex flex-wrap items-center gap-1 text-footer-color dark:text-white/80 justify-center">
                    By creating an account, you agree to our
                    <span className="cursor-pointer text-footer-primary dark:text-green-400 font-medium">Terms of Service</span>
                    and
                    <span className="cursor-pointer text-footer-primary dark:text-green-400 font-medium">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}