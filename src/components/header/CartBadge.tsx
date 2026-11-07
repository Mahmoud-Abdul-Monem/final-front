'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCart3 } from "react-icons/bs";
import { useCartStore } from "@/store/cartStore";

export default function CartBadge() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartCount = getTotalItems();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" aria-label="Cart" className="relative">
      <BsCart3 className="w-5 h-5 cursor-pointer text-white hover:text-white/80 transition-colors" />
      {mounted && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </Link>
  );
}
