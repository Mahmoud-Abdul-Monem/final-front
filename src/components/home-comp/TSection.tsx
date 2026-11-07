import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { getCategories } from '@/services/categories'

export default async function TSection() {
  const categories = await getCategories();

  return (
    <div className="col-span-5 py-16 bg-white dark:bg-dark-theme transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400">Browse our wide range of categories</p>
          </div>
          <Link
            href="/products"
            className="text-primary-store hover:text-green-700 font-semibold flex items-center gap-2 transition-colors"
          >
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <div
                key={category.documentId || category.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
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
                    {category.itemCount || 0} items
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No categories available at the moment.</p>
        )}
      </div>
    </div>
  )
}
