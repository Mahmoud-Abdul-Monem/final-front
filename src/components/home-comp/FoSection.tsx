import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiTag } from 'react-icons/fi'
import { getSpecialOffers, getAllDeals } from '@/services/offers'
import DealProducts from './DealProducts'

export default async function FoSection() {
  const [offers, deals] = await Promise.all([
    getSpecialOffers(),
    getAllDeals(),
  ]);

  const specialOffer = offers?.[0] || null;
  const dealProducts = deals || [];

  return (
    <div className="col-span-5 py-16 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        {/* Main Banner */}
        {specialOffer && (
          <div className="relative rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0">
              {specialOffer.image && (
                <Image
                  src={specialOffer.image}
                  alt={specialOffer.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-30"
                />
              )}
            </div>
            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <FiTag className="w-4 h-4" />
                  <span>{specialOffer.discount}% OFF</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {specialOffer.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 mb-4">
                  {specialOffer.subtitle}
                </p>
                <p className="text-gray-300 mb-6">
                  {specialOffer.description}
                </p>
                {specialOffer.validUntil && (
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white">
                      <FiClock className="w-5 h-5" />
                      <span className="font-semibold">Valid Until:</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-mono">
                      {specialOffer.validUntil}
                    </div>
                  </div>
                )}
                <Link
                  href="/products"
                  className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Deal Products */}
        {dealProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Hot Deals</h3>
            <DealProducts products={dealProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
