"use client";

import toast from "react-hot-toast";
import type { Product } from "@/services/products";
import { useCartStore } from "@/store/cartStore";
import { hasAuthToken } from "@/lib/auth";
import { toCartItem } from "@/lib/cart";

export function useCartActions() {
  const addItem = useCartStore((state) => state.addItem);

  const addProduct = (product: Product): boolean => {
    if (!hasAuthToken()) {
      toast.error("Log in to add items to your cart.");
      return false;
    }

    addItem(toCartItem(product));
    toast.success(`${product.name} added to cart`);
    return true;
  };

  const canViewCart = (): boolean => {
    if (hasAuthToken()) return true;

    toast.error("Log in to view your cart.");
    return false;
  };

  return { addProduct, canViewCart };
}
