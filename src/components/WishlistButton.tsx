"use client";

import { FiHeart } from "react-icons/fi";
import { useWishlistStore } from "@/store/wishlistStore";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
  iconClassName?: string;
}

export default function WishlistButton({
  productId,
  productName,
  className = "",
  iconClassName = "",
}: WishlistButtonProps) {
  const isFavorite = useWishlistStore((state) => state.productIds.includes(productId));
  const toggleProduct = useWishlistStore((state) => state.toggleProduct);

  return (
    <button
      type="button"
      aria-label={isFavorite ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={isFavorite}
      onClick={() => toggleProduct(productId)}
      className={`${className} ${isFavorite ? "!text-rose-500" : ""}`}
    >
      <FiHeart
        className={`${iconClassName} ${isFavorite ? "!text-rose-500 fill-current" : ""}`}
        aria-hidden
      />
    </button>
  );
}
