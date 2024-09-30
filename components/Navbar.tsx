import Image from 'next/image'
import logo from '@/public/RLexiconLogo.svg'
import React from 'react'
import { ModeToggle } from './ThemeToggler'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { requireUser } from '@/utils/requireUser'

const Navbar = async () => {
  const user = await requireUser();
  const pic = user?.picture || '';
  return (
    <div className='fixed w-full h-20 shadow-md dark:shadow-zinc-900 flex justify-between px-4 py-2 items-center backdrop-blur-lg z-50'>
        <div>
        <Image src={logo} alt='logo' width={200} height={200} className='dark:drop-shadow-[1px_0.5px_0.5px_white]' />
        </div>
        <div>
        </div>
        <div className='flex items-center justify-center gap-5'>
            <ModeToggle />
            <Image src={pic} alt='logo' width={50} height={50} className='rounded-full' />
        </div>
    </div>
  )
}

export default Navbar