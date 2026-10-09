import Image from 'next/image'
import bagPic from "@/assets/Group 1.png"
export default function FSection() {
  return (
    <div className="col-span-5  py-10 ">
      <div className="flex justify-around items-center ">
        <div className="flex gap-6 flex-col">
          <p className='bg-[#AEF1D2] text-[#002116] tex-[14px] w-fit px-3 py-1 font-semibold leading-5 rounded-3xl'>Autumn Collection 2024</p>
          <h2 className="leading-14 text-[48px] max-w-142 text-footer-primary font-bold">Elevate Your Everyday
            Essentials</h2> 

          <p className="font-normal leading-7 text-[18px] text-footer-color max-w-110.25">
            Discover curated quality across electronics, fashion,
            and luxury beauty. Performance meets high-end
            design in every detail.
          </p>

          <div className="flex gap-4">
            <button className='rounded-lg flex justify-center items-center border px-8 py-3 text-[14px] leading-5 font-semibold text-white bg-primary-store'>Shop Collection</button>
            <button className='rounded-lg  flex justify-center items-center border px-8 py-3 text-[14px] leading-5 font-semibold text-footer-primary bg-[]'>View Lookbook</button>
          </div>


        </div>




        <div className="relative w-full max-w-142">
          <Image
            src={bagPic}
            alt="Bag Collection"
            width={568}
            height={426}
            className="w-full h-auto rounded-2xl object-cover shadow-sm"
          />

          <div className="absolute -bottom-5 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 min-w-50">
            <div className="bg-amber-100 p-2 rounded-xl flex items-center justify-center text-amber-500">
              ★
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-tight">Top Rated</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Selected by our curators</p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}


