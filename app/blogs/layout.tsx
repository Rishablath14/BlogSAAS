import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const Bloglayout = ({children}:{children:React.ReactNode}) => {
  return (
        <div className="w-full min-h-screen">
            <Navbar />
            <main className='pt-20'>
            {children}
            </main>
            <Footer />
        </div>
  )
}  

export default Bloglayout