import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: "Blogs - RLexicon",
    template: `%s | ${"Blogs - RLexicon"}`,
  },
  description: "Explore our blog posts and stay up-to-date with the latest news and trends in the industry.",
}
const Bloglayout = ({children}:{children:React.ReactNode}) => {
  return (
        <div className="w-full min-h-screen">
            <Navbar />
            <main className='pt-16 sm:pt-20'>
            {children}
            </main>
            <Footer />
        </div>
  )
}  

export default Bloglayout