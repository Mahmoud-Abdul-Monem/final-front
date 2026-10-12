'use client'
import Link from 'next/link'
import { BsCart3 } from "react-icons/bs";

import { useThemeStore } from '@/store/theme';
export default function Header() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const theme = useThemeStore((state) => state.theme);
    return (
        <div className="relative z-9 bg-footer-primary flex justify-center items-center dark:bg-dark-theme/70 w-full">
            <div className='text-white auth-header container flex items-center justify-between py-4.5 px-4 md:px-12 w-full'>

                <h1 className='font-bold text-[20px] md:text-[24px] leading-8 dark:text-white'>Luminous Marketplace</h1>
                <nav className='hidden md:flex gap-6 text-white/80 text-[14px] leading-5 font-semibold'>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="/" >
                        Home</Link>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="../../About" >
                        About</Link>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="../../Contactus" >
                        Contact us</Link>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="../../shopping" >
                        Shopping</Link>
                </nav>
                <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className='cursor-pointer text-xs md:text-sm dark:text-white px-2 py-1 bg-white/10 rounded'>theme</button>
                    <BsCart3 className='w-5 h-5 cursor-pointer dark:text-white' />
                </div>

            </div>
        </div>
    )
}