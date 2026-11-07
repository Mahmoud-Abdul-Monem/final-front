import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiTag } from 'react-icons/fi'
import { getSpecialOffers, getAllDeals } from '@/services/offers'

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dealProducts.map((product) => {
                const hasDiscount = product.originalPrice && product.originalPrice > product.price;
                const discountPercentage = hasDiscount 
                  ? Math.round((1 - product.price / product.originalPrice) * 100) 
                  : 0;

                const progress = product.total > 0 ? (product.sold / product.total) * 100 : 0;

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
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-300 mb-1">
                          <span>{product.sold} sold</span>
                          <span>{product.total} available</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                      <button className="w-full bg-primary-store hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
