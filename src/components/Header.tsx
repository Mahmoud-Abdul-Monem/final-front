'use client'
import Link from 'next/link'
import { BsCart3 } from "react-icons/bs";
import { useState } from 'react';

import { useThemeStore } from '@/store/theme';
export default function Header() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const theme = useThemeStore((state) => state.theme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative z-9 bg-footer-primary flex justify-center items-center dark:bg-dark-theme/70 w-full">
            <div className='text-white auth-header container flex items-center justify-between py-4.5 px-4 md:px-12 w-full'>

                <h1 className='font-bold text-[20px] md:text-[24px] leading-8 dark:text-white'>Luminous Marketplace</h1>

                {/* Desktop Navigation */}
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className='md:hidden flex flex-col gap-4 text-white/80 text-[14px] leading-5 font-semibold px-4 pb-4 bg-footer-primary dark:bg-dark-theme/70'>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="/" onClick={() => setIsMenuOpen(false)}>
                        Home</Link>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="../../About" onClick={() => setIsMenuOpen(false)}>
                        About</Link>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="../../Contactus" onClick={() => setIsMenuOpen(false)}>
                        Contact us</Link>
                    <Link className='hover:text-white/55 dark:text-white dark:hover:text-white/55' href="../../shopping" onClick={() => setIsMenuOpen(false)}>
                        Shopping</Link>
                </nav>
            )}
        </div>
    )
}