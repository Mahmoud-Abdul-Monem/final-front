import React from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
    const contactInfo = [
        {
            icon: FiMail,
            title: "Email",
            value: "support@luminous.com",
            description: "We'll respond within 24 hours"
        },
        {
            icon: FiPhone,
            title: "Phone",
            value: "+1 (555) 123-4567",
            description: "Mon-Fri 9am-6pm EST"
        },
        {
            icon: FiMapPin,
            title: "Address",
            value: "123 Commerce St, New York, NY 10001",
            description: "Visit our flagship store"
        }
    ]

    return (
        <div className="min-h-screen w-full bg-white dark:bg-dark-theme transition-colors">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-store to-green-700 py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg md:text-xl text-white/90">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Content */}
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Send us a Message
                            </h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-store focus:border-transparent transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-store focus:border-transparent transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-store focus:border-transparent transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-store focus:border-transparent transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="product">Product Question</option>
                                        <option value="support">Technical Support</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-store focus:border-transparent transition-colors resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary-store hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <FiSend className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6 mb-8">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                                    >
                                        <div className="bg-primary-store/10 dark:bg-primary-store/20 p-3 rounded-lg">
                                            <info.icon className="w-6 h-6 text-primary-store" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-900 dark:text-white mb-1">
                                                {info.value}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500 dark:text-gray-400">Interactive Map</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500">123 Commerce St, New York, NY</p>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Business Hours
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span>Monday - Friday</span>
                                        <span>9:00 AM - 6:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span>Saturday</span>
                                        <span>10:00 AM - 4:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Quick answers to common questions
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "How long does shipping take?",
                                answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery."
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached."
                            },
                            {
                                question: "Do you ship internationally?",
                                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination."
                            },
                            {
                                question: "How can I track my order?",
                                answer: "Once your order ships, you'll receive an email with a tracking number. You can also track your order in your account."
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
