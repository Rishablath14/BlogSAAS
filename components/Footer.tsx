import Image from 'next/image'
import React from 'react'
import logo from '@/public/RLexiconLogo.svg'
import Link from 'next/link'

const Footer = () => {
  return (
    

<footer className="rounded-lg shadow dark:shadow-zinc-900">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Image src={logo} alt='logo' width={200} height={200} className='dark:drop-shadow-[1px_0.5px_0.5px_white]' />
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                    <Link href="/" className="hover:underline me-4 md:me-6">Home</Link>
                </li>
                <li>
                    <Link href="/blogs" className="hover:underline me-4 md:me-6">Blogs</Link>
                </li>
                <li>
                    <Link href="/#pricing" className="hover:underline me-4 md:me-6">Pricing</Link>
                </li>
                <li>
                    <Link href="/#contact" className="hover:underline me-4 md:me-6">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <div className='w-full flex-col sm:flex-row flex justify-around items-center gap-1'>
        <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">RLexicon™</Link>. All Rights Reserved.</p>
        <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Made By <Link href="https://rishablathportfolio.netlify.app/" target='_blank' className="hover:underline">Rishab Lath</Link></p>
        </div>
    </div>
</footer>
  )
}

export default Footer