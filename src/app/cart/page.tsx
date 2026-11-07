'use client';

import Image from "next/image";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal, getTotalItems, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
                <div className="w-24 h-24 rounded-full bg-primary-store/10 flex items-center justify-center">
                    <FiShoppingBag className="w-12 h-12 text-primary-store" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-ink dark:text-white mb-2">Your cart is empty</h2>
                    <p className="text-body dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <a
                        href="/shopping"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-store hover:bg-green-700 text-white font-semibold transition-colors"
                    >
                        Continue Shopping
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-ink dark:text-white mb-2">Shopping Cart</h1>
                <p className="text-body dark:text-gray-400">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-form-gray/30 dark:border-gray-700/60 p-4 flex gap-4"
                        >
                            {/* Product Image */}
                            <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-image-bg dark:bg-gray-700/50">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="96px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-body/40 text-xs">
                                        No image
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    {item.category && (
                                        <p className="text-xs font-medium uppercase tracking-widest text-body dark:text-gray-400 mb-1">
                                            {item.category}
                                        </p>
                                    )}
                                    <h3 className="font-semibold text-ink dark:text-white text-base line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg font-bold text-price-gold dark:text-gold-btn mt-1">
                                        ${item.price}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-lg border border-form-gray/50 dark:border-gray-600 flex items-center justify-center text-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <FiMinus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium text-ink dark:text-white">
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-lg border border-form-gray/50 dark:border-gray-600 flex items-center justify-center text-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <FiPlus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            removeItem(item.id);
                                            toast.success(`${item.name} removed from cart`);
                                        }}
                                        className="text-red-500 hover:text-red-600 transition-colors"
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Clear Cart Button */}
                    <button
                        type="button"
                        onClick={() => {
                            clearCart();
                            toast.success('Cart cleared');
                        }}
                        className="text-sm text-body dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-form-gray/30 dark:border-gray-700/60 p-6 sticky top-24">
                        <h2 className="text-xl font-semibold text-ink dark:text-white mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-body dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="font-medium text-ink dark:text-white">${getSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-body dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="font-medium text-ink dark:text-white">Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between text-body dark:text-gray-400">
                                <span>Tax</span>
                                <span className="font-medium text-ink dark:text-white">Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-form-gray/30 dark:border-gray-700/60 pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-ink dark:text-white">Total</span>
                                <span className="text-2xl font-bold text-price-gold dark:text-gold-btn">
                                    ${getSubtotal().toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full py-3 rounded-lg bg-primary-store hover:bg-green-700 text-white font-semibold transition-colors mb-3"
                        >
                            Proceed to Checkout
                        </button>

                        <a
                            href="/shopping"
                            className="block w-full py-3 rounded-lg border border-form-gray/50 dark:border-gray-600 text-center text-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
