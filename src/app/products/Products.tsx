import CatalogExplorer from "@/components/catalog/CatalogExplorer";
import { getProductPageByCategories, getProductPageData } from "@/services/products";
import { getCategories } from "@/services/categories";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[] }>;
}) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const categoryValues = (Array.isArray(params.category) ? params.category : params.category ? [params.category] : [])
    .flatMap((value) => value.split(","))
    .filter(Boolean);
  const requestedPage = Math.max(1, Number.parseInt(pageValue || "1", 10) || 1);
  const categories = await getCategories();
  const selectedCategories = categories.filter((category) => categoryValues.includes(category.documentId));
  const productPage = selectedCategories.length > 0
    ? await getProductPageByCategories(selectedCategories.map((category) => category.id), requestedPage)
    : await getProductPageData(requestedPage);

  return (
    <CatalogExplorer
      products={productPage.products}
      pagination={productPage.pagination}
      categories={categories}
      initialCategories={selectedCategories.map((category) => category.documentId)}
      title="All Products"
      description="Discover all available products in our store — curated quality and modern commerce."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Products" },
      ]}
    />
  );
}
