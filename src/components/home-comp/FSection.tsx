import Image from 'next/image'
import bagPic from "@/assets/Group 1.png"

export default function FSection() {
  return (
    <div className="col-span-5 py-10 bg-white dark:bg-dark-theme transition-colors">
      <div className="flex flex-col lg:flex-row justify-around items-center gap-8 lg:gap-0">
        <div className="flex gap-6 flex-col text-center lg:text-left order-2 lg:order-1">
          <p className='bg-[#AEF1D2] dark:bg-emerald-950/80 text-[#002116] dark:text-emerald-300 tex-[14px] w-fit px-3 py-1 font-semibold leading-5 rounded-3xl mx-auto lg:mx-0'>Autumn Collection 2024</p>
          <h2 className="leading-14 text-[32px] md:text-[40px] lg:text-[48px] max-w-142 text-footer-primary dark:text-white font-bold">Elevate Your Everyday
            Essentials</h2>

          <p className="font-normal leading-7 text-[16px] md:text-[18px] text-footer-color dark:text-gray-300 max-w-110.25">
            Discover curated quality across electronics, fashion,
            and luxury beauty. Performance meets high-end
            design in every detail.
          </p>

          <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
            <button className='rounded-lg flex justify-center items-center border border-transparent px-6 md:px-8 py-3 text-[14px] leading-5 font-semibold text-white bg-primary-store hover:bg-green-700 transition-all'>Shop Collection</button>
            <button className='rounded-lg flex justify-center items-center border border-gray-300 dark:border-gray-700 px-6 md:px-8 py-3 text-[14px] leading-5 font-semibold text-footer-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all'>View Lookbook</button>
          </div>
        </div>

        <div className="relative w-full max-w-142 order-1 lg:order-2">
          <Image
            src={bagPic}
            alt="Bag Collection"
            width={568}
            height={426}
            priority
            className="w-auto h-auto rounded-2xl object-cover shadow-sm"
          />

          <div className="absolute -bottom-5 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3 min-w-50">
            <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded-xl flex items-center justify-center text-amber-500">
              ★
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Top Rated</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Selected by our curators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
