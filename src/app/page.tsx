import { Products } from "@/app/products/Products"
import ProtectedRoute from "@/components/ProtectedRoute";
import FSection from "@/components/home-comp/FSection";
import SSection from "@/components/home-comp/SSection";
import TSection from "@/components/home-comp/TSection";
import FoSection from "@/components/home-comp/FoSection";
export default function Home() {
  return (
    <div className="h-dvh w-full grid grid-cols-5 ">

      <ProtectedRoute>
        <FSection />
        <SSection />
        <TSection />
        <FoSection />
      </ProtectedRoute>


    </div>
  );
}
