import CatalogExplorer from "@/components/catalog/CatalogExplorer";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";

export default async function Products() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <CatalogExplorer
      products={products}
      categories={categories}
      title="All Products"
      description="Discover all available products in our store — curated quality and modern commerce."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Products" },
      ]}
    />
  );
}
