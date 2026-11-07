import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Luminous Marketplace",
  description:
    "Contact Luminous Marketplace for help with products, orders, shipping, and returns. Our support team is ready to help.",
  alternates: { canonical: "/Contactus" },
  openGraph: { title: "Contact Luminous Marketplace", url: "/Contactus" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
