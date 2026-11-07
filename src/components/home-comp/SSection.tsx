import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { getFeaturedProducts } from '@/services/products'

export default async function SSection() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="col-span-5 py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Handpicked items just for you</p>
          </div>
          <Link 
            href="/products" 
            className="text-primary-store hover:text-green-700 font-semibold flex items-center gap-2 transition-colors"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discountPercentage = hasDiscount 
                ? Math.round((1 - product.price / product.originalPrice!) * 100) 
                : 0;

              return (
                <div
                  key={product.documentId || product.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
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
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            No image
                          </div>
                        )}
                      </div>
                      <button 
                        aria-label="Add to wishlist"
                        className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800"
                      >
                        <FiHeart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
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
                        <span className="text-amber-400">★</span>
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
                      aria-label="Add to cart"
                      className="bg-primary-store hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <FiShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No featured products available at the moment.</p>
        )}
      </div>
    </div>
  )
}
