import prisma from '@/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

async function getData(userId: string) {
    const data = await prisma.channel.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return data;
  }

const page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/api/auth/login");
    }
    const data = await getData(user.id);
  return (
    <div className='w-full '>
        
    </div>
  )
}

export default page