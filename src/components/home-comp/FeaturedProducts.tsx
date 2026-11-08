'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingBag, FiStar } from 'react-icons/fi'
import WishlistButton from '@/components/WishlistButton'
import { useCartActions } from '@/hooks/useCartActions'
import type { Product } from '@/services/products'

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addProduct } = useCartActions();

  if (!products || products.length === 0) {
    return <p className="text-gray-500 text-center py-8">No featured products available at the moment.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, idx) => {
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercentage = hasDiscount 
          ? Math.round((1 - product.price / product.originalPrice!) * 100) 
          : 0;

        return (
          <div
            key={product.documentId || product.id}
            className="card featured-product-card group flex flex-col justify-between"
          >
            <div>
              <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                <div className="aspect-square relative">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={idx < 4}
                      loading={idx < 4 ? "eager" : "lazy"}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <WishlistButton
                  productId={product.documentId || String(product.id)}
                  productName={product.name}
                  className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800"
                  iconClassName="w-5 h-5 text-gray-600 dark:text-gray-300"
                />
                {hasDiscount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1">
                  <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating ?? 5.0}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews ?? 0})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <button 
                onClick={() => addProduct(product)}
                aria-label={`Add ${product.name} to cart`}
                className="btn btn-primary min-h-0 bg-primary-store hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
              >
                <FiShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
