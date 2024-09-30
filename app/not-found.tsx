import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen pt-20 flex-col'>
      <h1 className='text-3xl font-bold text-primary mb-4'>404 Error! Page Not Found.</h1>
      <p className='text-sm'>Page your are looking for does not exist</p>
      <Button className='bg-secondary text-white rounded px-4 py-2 mt-4' asChild>
        <Link href='/'>
        &lt;\-- Back To Home
        </Link>
        </Button>
    </div>
  )
}

export default notFound