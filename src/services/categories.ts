const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface Category {
  id: number;
  documentId: string;
  name: string;
  image: string;
  itemCount: number;
  description?: string;
  slug?: string;
}

/**
 * Fetch all categories with native Next.js fetch
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories?populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

/**
 * Fetch category by documentId
 */
export async function getCategoryById(documentId: string): Promise<Category | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories/${documentId}?populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Failed to fetch category by ID:', error);
    return null;
  }
}

/**
 * Fetch category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch category by slug:', error);
    return null;
  }
}
