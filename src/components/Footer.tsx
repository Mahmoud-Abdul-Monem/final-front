import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='w-full relative mt-auto flex justify-center items-center bg-footer-background dark:bg-dark-theme border-t border-gray-200 dark:border-gray-800 transition-colors'>
            <div className='container py-12 md:py-16 w-full px-4 md:px-12'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-y-10">
                    <div className="flex gap-4 flex-col">
                        <p className='text-footer-primary text-[24px] leading-8 font-bold dark:text-white'>Luminous</p>
                        <p className='text-footer-color text-[16px] md:text-[18px] leading-6 font-normal max-w-69 dark:text-gray-300'>
                            Elevating your lifestyle through curated quality and modern commerce.
                        </p>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h2 className='text-footer-secondary text-[18px] font-bold leading-5 dark:text-white'>Shop</h2>
                        <div className="flex flex-col gap-2">
                            <Link className='text-footer-color text-[16px] font-medium leading-6 w-fit hover:text-footer-primary dark:text-gray-300 dark:hover:text-white transition-colors' href="/products">Electronics</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-6 w-fit hover:text-footer-primary dark:text-gray-300 dark:hover:text-white transition-colors' href="/products">Fashion</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-6 w-fit hover:text-footer-primary dark:text-gray-300 dark:hover:text-white transition-colors' href="/products">Home</Link>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h2 className='text-footer-secondary text-[18px] leading-5 font-bold dark:text-white'>Support</h2>
                        <div className="flex flex-col gap-2">
                            <Link className='text-footer-color text-[16px] font-medium leading-6 w-fit hover:text-footer-primary dark:text-gray-300 dark:hover:text-white transition-colors' href="/Contactus">Help Center</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-6 w-fit hover:text-footer-primary dark:text-gray-300 dark:hover:text-white transition-colors' href="/Contactus">Shipping</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-6 w-fit hover:text-footer-primary dark:text-gray-300 dark:hover:text-white transition-colors' href="/Contactus">Returns</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className='text-footer-secondary text-[18px] font-bold leading-5 dark:text-white'>Subscribe</h2>
                        <div className="flex gap-2 max-w-70 flex-wrap">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered ui-field flex-1 min-w-[200px] rounded-lg px-4 py-3.25 text-[16px] outline-none border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-store"
                            />
                            <button className="btn btn-primary min-h-0 bg-footer-primary rounded-lg text-white px-5 py-2 text-[14px] leading-4 font-bold hover:bg-green-800 transition-all">
                                Go
                            </button>
                        </div>
                    </div>

                </div>

                <div className="lower-footer w-full border-t border-gray-300 dark:border-gray-700 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className='text-[12px] leading-4 text-footer-color dark:text-gray-400 text-center md:text-left'>
                        <span className="text-primary-green">&copy;</span> 2026 Luminous Marketplace. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className='text-[12px] leading-4 text-footer-color dark:text-gray-400 hover:underline'>Privacy Policy</Link>
                        <Link href="#" className='text-[12px] leading-4 text-footer-color dark:text-gray-400 hover:underline'>Terms of Services</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
