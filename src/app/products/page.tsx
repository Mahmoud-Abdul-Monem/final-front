import type { Metadata } from "next";
import Products from "./Products";

export const metadata: Metadata = {
  title: "Products | Luminous Marketplace",
  description: "Browse all products in our store.",
};

export default function ProductsPage() {
  return <Products />;
}
