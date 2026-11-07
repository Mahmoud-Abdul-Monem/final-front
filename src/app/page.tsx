import type { Metadata } from "next";
import FSection from "@/components/home-comp/FSection";
import SSection from "@/components/home-comp/SSection";
import TSection from "@/components/home-comp/TSection";
import FoSection from "@/components/home-comp/FoSection";

export const metadata: Metadata = {
  title: "Shop Electronics, Fashion & Home",
  description:
    "Explore featured products, shop popular categories, and find quality picks for your home and lifestyle at Luminous Marketplace.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-5 bg-white  dark:text-white dark:bg-dark-theme">

        <FSection />
        <SSection />
        <TSection />
        <FoSection />


    </div>
  );
}
