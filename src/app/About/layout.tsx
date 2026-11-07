import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Luminous Marketplace",
  description:
    "Learn about Luminous Marketplace, our story, our values, and our commitment to a thoughtful online shopping experience.",
  alternates: { canonical: "/About" },
  openGraph: { title: "About Luminous Marketplace", url: "/About" },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
