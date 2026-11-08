'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCart3 } from "react-icons/bs";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from 'next/navigation';
import { hasAuthToken } from '@/lib/auth';

export default function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  
  // Subscribe directly to items array so the component re-renders reactively on any cart update
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    setIsAuthenticated(hasAuthToken());
    setMounted(true);
  }, [pathname]);

  return (
    <Link href="/cart" aria-label="Cart" className="relative">
      <BsCart3 className="w-5 h-5 cursor-pointer text-white hover:text-white/80 transition-colors" />
      {mounted && isAuthenticated && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </Link>
  );
}
