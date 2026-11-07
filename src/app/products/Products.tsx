import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { getProducts, Product } from "@/services/products";

export default async function Products() {
    const products: Product[] = await getProducts();

    return (
        <section className="container mx-auto px-4 md:px-12 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Our Products</h1>
                    <p className="text-gray-600 dark:text-gray-400">Discover all available products in our store</p>
                </div>
            </div>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
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
                                        <div className="aspect-square relative w-full">
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
                                                    No image available
                                                </div>
                                            )}
                                        </div>
                                        <button 
                                            aria-label="Add to wishlist"
                                            className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 shadow"
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
                                        {product.category && (
                                            <span className="text-xs font-medium text-primary-store uppercase tracking-wider">
                                                {product.category.name}
                                            </span>
                                        )}
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-2">
                                            {product.name}
                                        </h3>

                                        {product.description && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {product.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="text-amber-400 text-sm">★</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {product.rating ?? 5.0}
                                            </span>
                                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                                ({product.reviews ?? 0} reviews)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700/50">
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
                                        className="bg-primary-store hover:bg-green-700 text-white p-2.5 rounded-lg transition-colors shadow-sm"
                                    >
                                        <FiShoppingBag className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No products available at the moment.</p>
                </div>
            )}
        </section>
    );
}

export { Products };
