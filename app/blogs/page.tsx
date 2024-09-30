import CategoryList from '@/components/CategoryList';
import Featured from '@/components/Featured';
import React from 'react'

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className='w-full min-h-screen'>
      <Featured />
      <CategoryList />
      <div className="flex gap-12">
      </div>
    </div>
  )
}

export default page