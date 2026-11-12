import CatalogExplorer from "@/components/catalog/CatalogExplorer";
import { getProductPageByCategory, getProductPageData } from "@/services/products";
import { getCategories } from "@/services/categories";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[] }>;
}) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const categoryValue = Array.isArray(params.category) ? params.category[0] : params.category;
  const requestedPage = Math.max(1, Number.parseInt(pageValue || "1", 10) || 1);
  const categories = await getCategories();
  const selectedCategory = categories.find((category) => category.documentId === categoryValue);
  const productPage = selectedCategory
    ? await getProductPageByCategory(selectedCategory.id, requestedPage)
    : await getProductPageData(requestedPage);

  return (
    <CatalogExplorer
      products={productPage.products}
      pagination={productPage.pagination}
      categories={categories}
      initialCategory={categoryValue ?? ""}
      title="All Products"
      description="Discover all available products in our store — curated quality and modern commerce."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Products" },
      ]}
    />
  );
}
