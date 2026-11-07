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
  title: "Luminous Marketplace",
  description: "Elevating your lifestyle through curated quality and modern commerce.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="font-jakarta overflow-x-hidden min-h-screen flex flex-col bg-white dark:bg-dark-theme text-gray-900 dark:text-white">
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
