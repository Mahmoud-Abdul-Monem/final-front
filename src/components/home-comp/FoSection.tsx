import React from 'react'
import Image from 'next/image'
import { FiClock, FiTag } from 'react-icons/fi'

// Placeholder for API data - will be replaced with actual API call
const specialOffer = {
  id: 1,
  title: "Flash Sale",
  subtitle: "Up to 70% Off on Electronics",
  description: "Limited time offer on premium electronics. Don't miss out on these amazing deals!",
  image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
  validUntil: "2 days 14 hours 30 minutes",
  discount: 70
}

const dealProducts = [
  {
    id: 1,
    name: "4K Ultra HD Smart TV",
    price: 499.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    sold: 85,
    total: 100
  },
  {
    id: 2,
    name: "Gaming Laptop Pro",
    price: 799.99,
    originalPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    sold: 62,
    total: 80
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 89.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    sold: 45,
    total: 50
  }
]

export default function FoSection() {
  return (
    <div className="col-span-5 py-16 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        {/* Main Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <Image
              src={specialOffer.image}
              alt={specialOffer.title}
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
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
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-white">
                  <FiClock className="w-5 h-5" />
                  <span className="font-semibold">Ends in:</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-mono">
                    {specialOffer.validUntil.split(' ')[0]}
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-mono">
                    {specialOffer.validUntil.split(' ')[1]}
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-mono">
                    {specialOffer.validUntil.split(' ')[2]}
                  </div>
                </div>
              </div>
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Deal Products */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Hot Deals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dealProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/15 transition-colors"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                <h4 className="font-semibold text-white text-base mb-2 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-white">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>{product.sold} sold</span>
                    <span>{product.total} available</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${(product.sold / product.total) * 100}%` }}
                    />
                  </div>
                </div>
                <button className="w-full bg-primary-store hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
