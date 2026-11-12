import type { Metadata } from "next";
import Products from "./Products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse the full Luminous Marketplace catalog. Filter products by category, price, brand, and rating to find what you need.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Shop All Products", url: "/products" },
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[] }>;
}) {
  return <Products searchParams={searchParams} />;
}
