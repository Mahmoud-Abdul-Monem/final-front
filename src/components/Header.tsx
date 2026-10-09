import Link from 'next/link'
import { BsCart3 } from "react-icons/bs";


export default function Header() {
    return (
        <div className=" relative z-9   bg-footer-primary flex justify-center items-center">
            <div className='text-white auth-header   container  flex items-center justify-between py-4.5 px-12'>


                <h1 className=' font-bold text-[24px] leading-8'>Luminous Marketplace</h1>
                <nav className='flex gap-6  text-white/80 text-[14px] leading-5 font-semibold'>
                    <Link className='hover:text-white/55' href="/" >
                        Home</Link>
                    <Link className='hover:text-white/55' href="../../About" >
                        About</Link>
                    <Link className='hover:text-white/55' href="../../Contactus" >
                        Contact us</Link>
                    <Link className='hover:text-white/55' href="../../shopping" >
                        Shopping</Link> 
                </nav>

                <BsCart3 className='w-5 h-5 cursor-pointer ' />


            </div>

        </div>
    )
}