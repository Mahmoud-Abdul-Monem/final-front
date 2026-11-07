import React from 'react'
import Link from 'next/link'
import { getFeaturedProducts } from '@/services/products'
import FeaturedProducts from './FeaturedProducts'

export default async function SSection() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section aria-labelledby="featured-products-heading" className="col-span-5 py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 id="featured-products-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
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

        <FeaturedProducts products={featuredProducts || []} />
      </div>
    </section>
  )
}
