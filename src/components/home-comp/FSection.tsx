import Image from 'next/image'
import { FiStar } from 'react-icons/fi'
import bagPic from "@/assets/Group 1.png"

export default function FSection() {
  return (
    <section className="col-span-5 py-8 md:py-14 lg:py-16 bg-white dark:bg-dark-theme transition-colors">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-8 lg:gap-12">
          
          {/* Content Column */}
          <div className="flex gap-5 md:gap-6 flex-col text-center md:text-left order-2 md:order-1 flex-1 max-w-xl">
            <p className="bg-[#AEF1D2] dark:bg-emerald-950/80 text-[#002116] dark:text-emerald-300 text-[14px] w-fit px-3 py-1 font-semibold leading-5 rounded-3xl mx-auto md:mx-0">
              Autumn Collection 2024
            </p>

            <h1 className="leading-tight md:leading-12 lg:leading-14 text-[30px] md:text-[36px] lg:text-[48px] text-footer-primary dark:text-white font-bold">
              Elevate Your Everyday Essentials
            </h1>

            <p className="font-normal leading-relaxed text-[15px] md:text-[16px] lg:text-[18px] text-footer-color dark:text-gray-300">
              Discover curated quality across electronics, fashion, and luxury beauty. Performance meets high-end design in every detail.
            </p>

            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <button className="rounded-lg flex justify-center items-center border border-transparent px-6 md:px-8 py-3 text-[14px] leading-5 font-semibold text-white bg-primary-store hover:bg-green-700 transition-all shadow-sm">
                Shop Collection
              </button>
              <button className="rounded-lg flex justify-center items-center border border-gray-300 dark:border-gray-700 px-6 md:px-8 py-3 text-[14px] leading-5 font-semibold text-footer-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                View Lookbook
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full md:w-1/2 flex-1 max-w-142 order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-[500px]">
              <Image
                src={bagPic}
                alt="Bag Collection"
                width={568}
                height={426}
                priority
                className="w-full h-auto rounded-2xl object-cover shadow-sm"
              />

              {/* Smooth Responsively-Scaled Top Rated Badge */}
              <div className="absolute -bottom-3 left-3 sm:-bottom-4 sm:left-4 md:-bottom-5 md:left-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-2 sm:gap-2.5 md:gap-3 transition-all duration-300 hover:scale-105">
                <div className="bg-amber-100 dark:bg-amber-950 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-amber-500 text-xs sm:text-sm font-bold shrink-0"><FiStar className="w-3.5 h-3.5 fill-amber-500" /></div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    Top Rated
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 whitespace-nowrap">
                    Selected by our curators
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
