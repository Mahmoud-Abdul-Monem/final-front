import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeProvider from "./providers/Themeprovider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "Luminous Marketplace",
  title: {
    default: "Luminous Marketplace | Quality Products, Curated for You",
    template: "%s | Luminous Marketplace",
  },
  description:
    "Shop a curated range of electronics, fashion, home, and lifestyle products at Luminous Marketplace, with quality picks and a simple shopping experience.",
  keywords: [
    "online marketplace",
    "shop online",
    "electronics",
    "fashion",
    "home products",
    "Luminous Marketplace",
  ],
  openGraph: {
    type: "website",
    siteName: "Luminous Marketplace",
    title: "Luminous Marketplace | Quality Products, Curated for You",
    description:
      "Discover a curated collection of electronics, fashion, home, and lifestyle products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminous Marketplace | Quality Products, Curated for You",
    description:
      "Discover a curated collection of electronics, fashion, home, and lifestyle products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Blocking script: applies dark mode from localStorage BEFORE first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var s=localStorage.getItem("theme-storage");if(s){var t=JSON.parse(s).state.theme;if(t==="dark"){d.classList.add("dark");d.setAttribute("data-theme","dark")}else{d.classList.remove("dark");d.setAttribute("data-theme","light")}}else{d.classList.add("dark");d.setAttribute("data-theme","dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-jakarta overflow-x-hidden min-h-screen flex flex-col bg-white dark:bg-dark-theme text-gray-900 dark:text-white">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
