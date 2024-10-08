import React from 'react'
import BlogApplication from '../components/Blogs';
import prisma from '@/utils/db';

const blogs = async ()=>{
  const data = await prisma.post.findMany({
    select:{
      id: true,
      createdAt: true,
      slug: true,
      image: true,
      title: true,
      views: true,
      smallDescription: true,
      catSlug: true,
      User: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        }
      },
      Channel: {
        select: {
          name: true,
          subdirectory: true,
        }
      }
    }
  });
  if(!data){
    return null;
  }

  return data;
}
const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page) || 1;
  const data = await prisma.category.findMany();
  const posts = await blogs();
  return ( 
   <BlogApplication blogs={posts} categories={data}/>
  )
}

export default page