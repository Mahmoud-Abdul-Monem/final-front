import type { Metadata } from "next";
import CatalogExplorer from "@/components/catalog/CatalogExplorer";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";

export const metadata: Metadata = {
  title: "Shop Electronics",
  description:
    "Browse electronics selected for performance, design, and everyday use at Luminous Marketplace.",
  alternates: { canonical: "/shopping" },
  openGraph: { title: "Shop Electronics", url: "/shopping" },
};

export default async function ShoppingPage() {
  // TODO: pass URL searchParams (q, category, min, max, page, sort) into these
  // service calls once server-side filtering/pagination is wired up.
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <CatalogExplorer
      products={products}
      categories={categories}
      title="Electronics"
      description="Discover the pinnacle of technological innovation and sophisticated design. Our curated collection of high-end electronics bridges the gap between performance and luxury."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/products" },
        { label: "Electronics" },
      ]}
    />
  );
}
