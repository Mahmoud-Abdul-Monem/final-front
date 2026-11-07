const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category?: string;
  description?: string;
  stock?: number;
}

/**
 * Fetch featured products using native Next.js fetch with ISR cache
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`, {
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
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?filters[category][id][$eq]=${categoryId}&populate=*`, {
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
 * Fetch product details by ID
 */
export async function getProductById(productId: number): Promise<Product | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products/${productId}?populate=*`, {
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
    const response = await fetch(`${STRAPI_URL}/api/products?filters[name][$containsi]=${encodeURIComponent(query)}&populate=*`, {
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
