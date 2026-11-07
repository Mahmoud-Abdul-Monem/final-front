import React from 'react'
import Image from 'next/image'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'

// Placeholder for API data - will be replaced with actual API call
const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 449.99,
    originalPrice: 549.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 56
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 203
  }
]

export default function SSection() {
  return (
    <div className="col-span-5 py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Handpicked items just for you</p>
          </div>
          <button className="text-primary-store hover:text-green-700 font-semibold flex items-center gap-2 transition-colors">
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <button className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800">
                  <FiHeart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="bg-primary-store hover:bg-green-700 text-white p-2 rounded-lg transition-colors">
                    <FiShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
