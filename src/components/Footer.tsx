import Link from 'next/link';
export default function Footer() {
    return (
        <footer className=' z-9 relative flex justify-center  items-center bg-footer-background'>
            <div className='container py-16 w-full '>
            <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-5  sm:gap-y-7">
                <div className="flex gap-4 flex-col ">
                    <h2 className='text-footer-primary text-[24px] leading-8 font-bold '>Luminous</h2>
                    <p className='text-footer-color text-[18px] leading-6 font-normal max-w-69'>
                        Elevating your lifestyle through curated quality and modern commerce.
                    </p>
                </div>

                <div className="flex gap-4 flex-col ">
                    <h2 className='text-footer-secondary text-[18px] font-bold leading-5 '>Shop</h2>
                    <div className="flex flex-col gap-2">
                        <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary ' href={"#"}>Electronics</Link>
                        <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary ' href={"#"}>Fashion</Link>
                        <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary ' href={"#"}>Home</Link>
                    </div>
                </div>

                <div className="flex gap-4 flex-col">
                    <h2 className='text-footer-secondary text-[18px] leading-5 font-bold  '>Support</h2>
                    <div className="flex flex-col gap-2 ">
                        <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary ' href={"#"}>Help Center</Link>
                        <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary ' href={"#"}>Shipping</Link>
                        <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary ' href={"#"}>Returns</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className='text-footer-secondary text-[18px] font-bold leading-5 '>Subscribe</h2>
                    <div className="flex gap-2 max-w-70 ">
                        <input
                            type="email"
                            placeholder="Email"
                            className="flex-1 bg-white rounded-lg px-4 py-3.25 text-[16px] outline-none"
                        />
                        <button className=" bg-footer-primary/95 rounded-lg text-white px-4 py-2 text-[12px] leading-4 font-bold hover:bg-footer-primary/90 transition-all">
                            Go
                        </button>
                    </div>
                </div>

            </div>

            <div className="lower-footer   w-full border-t border-gray-300 pt-6 flex justify-between items-center">
                <p className='text-[12px] leading-4 text-footer-color'>
                    <span className="text-primary-green">&copy;</span> 2026 Luminous Marketplace. All rights reserved.
                </p>
                <div className="flex  gap-4">
                    <Link href="#" className='text-[12px] leading-4 text-footer-color '>Privacy Policy</Link>
                    <Link href="#" className='text-[12px] leading-4 text-footer-color  '>Terms of Services</Link>
                </div>
            </div>
</div>
        </footer>
    );
}






