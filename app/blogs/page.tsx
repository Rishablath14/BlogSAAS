import Featured from '@/components/Featured';
import React from 'react'

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className='w-full min-h-screen'>
      <Featured />
    </div>
  )
}

export default page