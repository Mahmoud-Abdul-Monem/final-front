import type { Product } from "@/services/products";
import type { CartItem } from "@/store/cartStore";

export function toCartItem(product: Product): Omit<CartItem, "quantity"> {
  return {
    id: String(product.id),
    documentId: product.documentId,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category?.name,
  };
}
