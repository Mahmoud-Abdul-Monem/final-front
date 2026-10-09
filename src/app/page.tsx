import { Products } from "@/app/products/Products"
import FSection from "@/components/home-comp/FSection";
import SSection from "@/components/home-comp/SSection";
import TSection from "@/components/home-comp/TSection";
import FoSection from "@/components/home-comp/FoSection";
export default function Home() {
  return (
    <div className="h-dvh w-full grid grid-cols-5 ">


      <FSection />
      <SSection />
      <TSection />
      <FoSection />


    </div>
  );
}
