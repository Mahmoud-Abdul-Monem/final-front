import Link from 'next/link';
import ThemeToggle from "./header/ThemeToggle";
import MobileNav from "./header/MobileNav";
import CartBadge from "./header/CartBadge";
import AuthLinks from "./header/AuthLinks";

export default function Header() {
    return (
        <header className="sticky top-0 z-40 bg-footer-primary dark:bg-dark-theme border-b border-white/10 dark:border-gray-800 flex justify-center items-center w-full transition-colors shadow-sm">
            <div className="text-white auth-header container flex items-center justify-between py-4.5 px-4 md:px-12 w-full">
                <Link href="/" className="font-bold text-[20px] md:text-[24px] leading-8 text-white">
                    Luminous Marketplace
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 text-white/90 text-[14px] leading-5 font-semibold">
                    <Link className="hover:text-white/70 dark:hover:text-white/70 transition-colors" href="/">
                        Home
                    </Link>
                    <Link className="hover:text-white/70 dark:hover:text-white/70 transition-colors" href="/About">
                        About
                    </Link>
                    <Link className="hover:text-white/70 dark:hover:text-white/70 transition-colors" href="/Contactus">
                        Contact us
                    </Link>
                    <Link className="hover:text-white/70 dark:hover:text-white/70 transition-colors" href="/products">
                        Products
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <AuthLinks />
                    <ThemeToggle />
                    <CartBadge />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
