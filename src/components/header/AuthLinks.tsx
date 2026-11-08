'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasAuthToken } from '@/lib/auth';

export default function AuthLinks() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsAuthenticated(hasAuthToken());
    setMounted(true);
  }, [pathname]);

  if (!mounted || isAuthenticated) return null;

  return (
    <nav aria-label="Account" className="flex items-center gap-2">
      <Link
        href="/login"
        className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/50 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer-primary"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="inline-flex min-h-10 items-center justify-center rounded-full bg-white px-3 sm:px-4 text-xs sm:text-sm font-semibold text-footer-primary shadow-sm transition-colors hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer-primary"
      >
        Register
      </Link>
    </nav>
  );
}
