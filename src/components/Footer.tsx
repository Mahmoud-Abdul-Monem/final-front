import Link from 'next/link';
export default function Footer() {
    return (
        <footer className='z-9 relative flex justify-center items-center bg-footer-background dark:bg-dark-theme/70'>
            <div className='container py-16 w-full'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-y-7">
                    <div className="flex gap-4 flex-col">
                        <h2 className='text-footer-primary text-[24px] leading-8 font-bold dark:text-white'>Luminous</h2>
                        <p className='text-footer-color text-[18px] leading-6 font-normal max-w-69 dark:text-white/80'>
                            Elevating your lifestyle through curated quality and modern commerce.
                        </p>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h2 className='text-footer-secondary text-[18px] font-bold leading-5 dark:text-white'>Shop</h2>
                        <div className="flex flex-col gap-2">
                            <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary dark:text-white/80 dark:hover:text-white' href={"#"}>Electronics</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary dark:text-white/80 dark:hover:text-white' href={"#"}>Fashion</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary dark:text-white/80 dark:hover:text-white' href={"#"}>Home</Link>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h2 className='text-footer-secondary text-[18px] leading-5 font-bold dark:text-white'>Support</h2>
                        <div className="flex flex-col gap-2">
                            <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary dark:text-white/80 dark:hover:text-white' href={"#"}>Help Center</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary dark:text-white/80 dark:hover:text-white' href={"#"}>Shipping</Link>
                            <Link className='text-footer-color text-[16px] font-medium leading-4 w-fit hover:text-footer-primary dark:text-white/80 dark:hover:text-white' href={"#"}>Returns</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className='text-footer-secondary text-[18px] font-bold leading-5 dark:text-white'>Subscribe</h2>
                        <div className="flex gap-2 max-w-70">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 bg-white dark:bg-gray-800 dark:text-white rounded-lg px-4 py-3.25 text-[16px] outline-none"
                            />
                            <button className="bg-footer-primary/95 rounded-lg text-white px-4 py-2 text-[12px] leading-4 font-bold hover:bg-footer-primary/90 transition-all">
                                Go
                            </button>
                        </div>
                    </div>

                </div>

                <div className="lower-footer w-full border-t border-gray-300 dark:border-gray-700 pt-6 flex justify-between items-center">
                    <p className='text-[12px] leading-4 text-footer-color dark:text-white/80'>
                        <span className="text-primary-green">&copy;</span> 2026 Luminous Marketplace. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className='text-[12px] leading-4 text-footer-color dark:text-white/80'>Privacy Policy</Link>
                        <Link href="#" className='text-[12px] leading-4 text-footer-color dark:text-white/80'>Terms of Services</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}