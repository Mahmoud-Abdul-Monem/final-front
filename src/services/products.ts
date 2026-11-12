import { STRAPI_BASE_URL } from "@/lib/strapi";

export interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  category?: {
    id: number;
    documentId: string;
    name: string;
    description?: string;
  };
  description?: string;
  stock?: number;
  isFeatured?: boolean;
}

export interface ProductPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ProductPage {
  products: Product[];
  pagination: ProductPagination;
}

export const CATALOG_PAGE_SIZE = 24;

async function getProductPage(query: { page?: number; pageSize?: number; categoryIds?: Array<number | string> }): Promise<ProductPage> {
  const page = Math.max(1, Math.floor(query.page ?? 1));
  const pageSize = Math.max(1, Math.floor(query.pageSize ?? CATALOG_PAGE_SIZE));
  const params = new URLSearchParams({
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    populate: "*",
  });
  query.categoryIds?.forEach((categoryId, index) => {
    params.set(`filters[category][id][$in][${index}]`, String(categoryId));
  });

  const empty: ProductPage = {
    products: [],
    pagination: { page, pageSize, pageCount: 0, total: 0 },
  };

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/products?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return empty;
    const data = await response.json();
    return {
      products: data?.data ?? [],
      pagination: {
        page: data?.meta?.pagination?.page ?? page,
        pageSize: data?.meta?.pagination?.pageSize ?? pageSize,
        pageCount: data?.meta?.pagination?.pageCount ?? 0,
        total: data?.meta?.pagination?.total ?? 0,
      },
    };
  } catch (error) {
    console.error("Failed to fetch product page:", error);
    return empty;
  }
}

export function getProductPageData(page = 1, pageSize = CATALOG_PAGE_SIZE): Promise<ProductPage> {
  return getProductPage({ page, pageSize });
}

export function getProductPageByCategory(
  categoryId: number | string,
  page = 1,
  pageSize = CATALOG_PAGE_SIZE,
): Promise<ProductPage> {
  return getProductPage({ categoryIds: [categoryId], page, pageSize });
}

export function getProductPageByCategories(
  categoryIds: Array<number | string>,
  page = 1,
  pageSize = CATALOG_PAGE_SIZE,
): Promise<ProductPage> {
  return getProductPage({ categoryIds, page, pageSize });
}

/**
 * Fetch all products
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/products?populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

/**
 * Fetch featured products using native Next.js fetch with ISR cache
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
  categoryId: number | string,
  page = 1,
  pageSize = CATALOG_PAGE_SIZE,
): Promise<ProductPage> {
  try {
    return await getProductPage({ categoryIds: [categoryId], page, pageSize });
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    return {
      products: [],
      pagination: { page, pageSize, pageCount: 0, total: 0 },
    };
  }
}

/**
 * Fetch product details by documentId
 */
export async function getProductById(documentId: string): Promise<Product | null> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/products/${documentId}?populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to fetch product by id:', error);
    return null;
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/products?filters[name][$containsi]=${encodeURIComponent(query)}&populate=*`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
}
