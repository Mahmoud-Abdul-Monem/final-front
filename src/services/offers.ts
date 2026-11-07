const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface SpecialOffer {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  validUntil: string;
  discount: number;
  startDate?: string;
  endDate?: string;
}

export interface DealProduct {
  id: number;
  documentId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  sold: number;
  total: number;
  offerId?: number;
}

/**
 * Fetch active special offers
 */
export async function getSpecialOffers(): Promise<SpecialOffer[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/special-offers?populate=*`, {
      next: { revalidate: 1800 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch special offers:', error);
    return [];
  }
}

/**
 * Fetch deal products for a specific offer
 */
export async function getDealProducts(offerId: number): Promise<DealProduct[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/deal-products?filters[offerId][$eq]=${offerId}&populate=*`, {
      next: { revalidate: 1800 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch deal products:', error);
    return [];
  }
}

/**
 * Fetch all active deals across all offers
 */
export async function getAllDeals(): Promise<DealProduct[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/deal-products?populate=*`, {
      next: { revalidate: 1800 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch deals:', error);
    return [];
  }
}
