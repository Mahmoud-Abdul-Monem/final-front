import type { Product, ProductPagination } from "@/services/products";
import type { Category } from "@/services/categories";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "rating";
export type CatalogView = "grid" | "list";

export interface CatalogFiltersState {
  query: string;
  categories: string[];
  minPrice: string;
  maxPrice: string;
  brands: string[];
}

export const DEFAULT_FILTERS: CatalogFiltersState = {
  query: "",
  categories: [],
  minPrice: "",
  maxPrice: "",
  brands: [],
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "rating", label: "Top Rated" },
];

export const PRODUCTS_PER_PAGE = 25;

export interface CatalogBreadcrumbItem {
  label: string;
  href?: string;
}

export interface CatalogExplorerProps {
  products: Product[];
  pagination: ProductPagination;
  categories: Category[];
  initialCategory?: string;
  title: string;
  description?: string;
  breadcrumb?: CatalogBreadcrumbItem[];
}
