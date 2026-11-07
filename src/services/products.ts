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
export async function getProductsByCategory(categoryId: number | string): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/products?filters[category][id][$eq]=${categoryId}&populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    return [];
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
