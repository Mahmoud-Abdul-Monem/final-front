import Image from "next/image";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import type { Product } from "@/services/products";
import type { CatalogView } from "./types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

// TODO: link cards to /products/[documentId] once the product detail page exists

interface CatalogProductCardProps {
  product: Product;
  view: CatalogView;
}

function PriceTag({ product, className = "" }: { product: Product; className?: string }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-bold text-price-gold dark:text-gold-btn text-lg leading-7">
        ${product.price}
      </span>
      {hasDiscount && (
        <span className="text-sm text-body/50 dark:text-gray-500 line-through">
          ${product.originalPrice}
        </span>
      )}
    </div>
  );
}

function Rating({ product }: { product: Product }) {
  const rating = product.rating ?? 5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-amber-400" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            className={`w-3 h-3 ${i < Math.round(rating) ? "fill-current" : "fill-none text-gray-300 dark:text-gray-600"}`}
          />
        ))}
      </div>
      <span className="text-xs text-body dark:text-gray-400">
        ({product.reviews ?? 0})
      </span>
    </div>
  );
}

function Badge({ product }: { product: Product }) {
  const isSoldOut = product.stock === 0;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  if (isSoldOut) {
    return (
      <span className="absolute left-3 top-3 z-10 px-2.5 py-1 rounded-full bg-red-600/10 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-wider">
        Sold out
      </span>
    );
  }
  if (product.isFeatured) {
    return (
      <span className="absolute left-3 top-3 z-10 px-2.5 py-1 rounded-full bg-primary-store/10 backdrop-blur-sm text-green-deep dark:text-green-active text-[10px] font-bold uppercase tracking-wider">
        New
      </span>
    );
  }
  if (discountPct > 0) {
    return (
      <span className="absolute left-3 top-3 z-10 px-2.5 py-1 rounded-full bg-red-600/10 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-wider">
        -{discountPct}%
      </span>
    );
  }
  return null;
}

function AddToCartButton({ product, fullWidth = false }: { product: Product; fullWidth?: boolean }) {
  const addItem = useCartStore((state) => state.addItem);
  const isSoldOut = product.stock === 0;

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      documentId: product.documentId,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category?.name,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <button
      type="button"
      disabled={isSoldOut}
      onClick={handleAddToCart}
      aria-label={`Add ${product.name} to cart`}
      className={
        fullWidth
          ? "mt-1 w-full h-12 rounded-lg bg-secondary-store hover:bg-[#c9a227] disabled:bg-gray-300 dark:disabled:bg-gray-700 text-[#241a00] dark:text-black text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          : "shrink-0 p-2 rounded-lg bg-gold-btn hover:bg-[#f0c94e] disabled:bg-gray-300 text-[#241a00] transition-colors"
      }
    >
      <FiShoppingBag className={fullWidth ? "w-4 h-4" : "w-5 h-5"} aria-hidden />
      {fullWidth && "Add to Cart"}
    </button>
  );
}

export default function CatalogProductCard({ product, view }: CatalogProductCardProps) {
  const isSoldOut = product.stock === 0;

  if (view === "list") {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl border border-form-gray/30 dark:border-gray-700/60 shadow-sm overflow-hidden flex flex-col sm:flex-row">
        <div className="relative block sm:w-56 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-44 bg-image-bg dark:bg-gray-700/50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 224px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-body/40 text-sm">
              No image
            </div>
          )}
          <Badge product={product} />
        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-2 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {product.category && (
                <p className="text-xs font-medium uppercase tracking-widest text-body dark:text-gray-400 truncate">
                  {product.category.name}
                </p>
              )}
              <h3 className="font-semibold text-ink dark:text-white text-base leading-snug line-clamp-2">
                {product.name}
              </h3>
            </div>
            <button
              type="button"
              aria-label="Add to wishlist"
              className="shrink-0 p-2 rounded-full border border-form-gray/50 dark:border-gray-600 text-body dark:text-gray-300 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              <FiHeart className="w-4 h-4" aria-hidden />
            </button>
          </div>

          <Rating product={product} />

          <div className="mt-auto pt-2 flex items-center justify-between gap-3">
            <PriceTag product={product} />
            <AddToCartButton product={product} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-xl border border-form-gray/30 dark:border-gray-700/60 shadow-sm overflow-hidden flex flex-col ${
        isSoldOut ? "opacity-80" : ""
      }`}
    >
      <div className="relative aspect-[4/5] lg:aspect-square bg-image-bg dark:bg-gray-700/50">
        <div className="absolute inset-0">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-body/40 text-sm">
              No image
            </div>
          )}
        </div>

        <Badge product={product} />

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-form-gray/40 dark:border-gray-600 flex items-center justify-center text-body dark:text-gray-300 hover:text-red-500 transition-colors"
        >
          <FiHeart className="w-4 h-4" aria-hidden />
        </button>
      </div>

      <div className="p-4 lg:p-5 flex flex-col gap-1.5 flex-1">
        {product.category && (
          <p className="text-xs font-medium uppercase tracking-widest text-body dark:text-gray-400 truncate">
            {product.category.name}
          </p>
        )}
        <h3 className="font-semibold text-ink dark:text-white text-base leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="pt-1">
          <Rating product={product} />
        </div>

        {/* Mobile / tablet: stacked price + full-width CTA (Figma mobile card) */}
        <div className="mt-auto pt-3 flex flex-col gap-3 lg:hidden">
          <PriceTag product={product} />
          <AddToCartButton product={product} fullWidth />
        </div>

        {/* Desktop: inline price + compact cart button (Figma desktop card) */}
        <div className="mt-auto pt-3 hidden lg:flex items-center justify-between gap-3">
          <PriceTag product={product} />
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
