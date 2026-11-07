import React from 'react'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'

// Placeholder for API data - will be replaced with actual API call
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    itemCount: 234
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    itemCount: 189
  },
  {
    id: 3,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    itemCount: 156
  },
  {
    id: 4,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
    itemCount: 98
  },
  {
    id: 5,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    itemCount: 67
  },
  {
    id: 6,
    name: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
    itemCount: 312
  }
]

export default function TSection() {
  return (
    <div className="col-span-5 py-16 bg-white dark:bg-dark-theme transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400">Browse our wide range of categories</p>
          </div>
          <button className="text-primary-store hover:text-green-700 font-semibold flex items-center gap-2 transition-colors">
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <FiArrowRight className="w-4 h-4 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {category.itemCount} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
