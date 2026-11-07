'use client';

import React from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import type { Product } from '@/services/products'

interface DealProductsProps {
  products: Product[];
}

export default function DealProducts({ products }: DealProductsProps) {
  const addItem = useCartStore((state) => state.addItem);

  if (!products || products.length === 0) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => {
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercentage = hasDiscount 
          ? Math.round((1 - product.price / product.originalPrice!) * 100) 
          : 0;

        return (
          <div
            key={product.documentId || product.id}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-800">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-white text-base mb-2 line-clamp-2">
                {product.name}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold text-white">
                  ${product.price}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button 
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
                className="w-full bg-primary-store hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
