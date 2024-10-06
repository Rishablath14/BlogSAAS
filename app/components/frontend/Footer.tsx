"use client"
import Image from 'next/image'
import React from 'react'
import logo from '@/public/RLexiconLogo.svg'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Footer = () => {
  const handleSubscribe=(e:React.FormEvent)=>{
    e.preventDefault();
    toast.info('Thankyou for showing interst in subscribing to our newsletter will start it soon. stay tuned for more updates!');
  }
  return (
    <>
    <section id="contact" className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  Contact Sales
                </h2>
                <div className="mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                      <p>+91 903-900-2468</p>
                    </div>
                  </div>
                  <div className="mt-6 flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                      <p>contact.rlexicon@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 md:mt-0">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  Subscribe to Our Newsletter
                </h2>
                <div className="mt-3">
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Get the latest news and updates from RLexicon delivered right to your inbox.
                  </p>
                </div>
                <div className="mt-9">
                  <form onSubmit={handleSubscribe} className="sm:flex">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs border-gray-300 rounded-md"
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <Button type='submit' className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        Subscribe
                      </Button>
                    </div>
                  </form>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    We care about your data. Read our{' '}
                    <Link href="/privacypolicy" className="font-medium text-orange-500 hover:text-orange-400">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
<footer className="rounded-lg shadow dark:shadow-zinc-900">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Image src={logo} alt='logo' width={200} height={200} className='dark:drop-shadow-[1px_0.5px_0.5px_white]' />
            <ul className="flex flex-wrap items-center mb-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
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
</>
  )
}

export default Footer