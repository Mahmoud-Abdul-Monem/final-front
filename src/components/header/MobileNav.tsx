'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <nav className="md:hidden absolute top-full left-0 w-full flex flex-col gap-4 text-white/80 text-[14px] leading-5 font-semibold px-4 py-4 bg-footer-primary dark:bg-dark-theme/95 shadow-lg border-t border-white/10 z-50">
                    <Link className="hover:text-white/55 dark:text-white dark:hover:text-white/55" href="/" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    <Link className="hover:text-white/55 dark:text-white dark:hover:text-white/55" href="/About" onClick={() => setIsMenuOpen(false)}>
                        About
                    </Link>
                    <Link className="hover:text-white/55 dark:text-white dark:hover:text-white/55" href="/Contactus" onClick={() => setIsMenuOpen(false)}>
                        Contact us
                    </Link>
                    <Link className="hover:text-white/55 dark:text-white dark:hover:text-white/55" href="/products" onClick={() => setIsMenuOpen(false)}>
                        Products
                    </Link>
                </nav>
            )}
        </>
    );
}
