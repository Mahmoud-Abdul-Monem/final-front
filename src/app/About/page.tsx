import React from 'react'
import Image from 'next/image'
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi'

export default function About() {
    const features = [
        {
            icon: FiTruck,
            title: "Free Shipping",
            description: "Free shipping on orders over $50"
        },
        {
            icon: FiShield,
            title: "Secure Payment",
            description: "100% secure payment processing"
        },
        {
            icon: FiHeadphones,
            title: "24/7 Support",
            description: "Round the clock customer support"
        },
        {
            icon: FiRefreshCw,
            title: "Easy Returns",
            description: "30-day return policy"
        }
    ]

    const stats = [
        { value: "50K+", label: "Happy Customers" },
        { value: "10K+", label: "Products" },
        { value: "100+", label: "Brands" },
        { value: "50+", label: "Countries" }
    ]

    return (
        <div className="min-h-screen w-full bg-white dark:bg-dark-theme transition-colors">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-store to-green-700 py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            About Luminous Marketplace
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Your trusted destination for premium products, exceptional service, and an unforgettable shopping experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Story
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                Founded in 2020, Luminous Marketplace started with a simple mission: to make quality products accessible to everyone. What began as a small online store has grown into a trusted destination for shoppers worldwide.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                We believe that shopping should be an enjoyable experience. That's why we carefully curate our collection, partner with trusted brands, and provide exceptional customer service at every step.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Today, we're proud to serve customers in over 50 countries, offering everything from electronics and fashion to home goods and beauty products.
                            </p>
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop"
                                alt="Our Story"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To provide our customers with the best shopping experience by offering high-quality products, competitive prices, and exceptional service. We strive to make shopping convenient, enjoyable, and accessible to everyone.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To become the world's most trusted and customer-centric online marketplace, where people can discover, buy, and enjoy products that enhance their lives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary-store mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We're committed to providing you with the best shopping experience
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className="bg-primary-store/10 dark:bg-primary-store/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-primary-store" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The passionate people behind Luminous Marketplace
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" },
                            { name: "Michael Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
                            { name: "Emily Davis", role: "Customer Experience", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" }
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="128px"
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
