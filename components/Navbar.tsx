import Image from 'next/image'
import logo from '@/public/RLexiconLogo.svg'
import React from 'react'
import { ModeToggle } from './ThemeToggler'

const Navbar = () => {
  return (
    <div className='fixed w-full h-20 shadow-md dark:shadow-zinc-800 flex justify-between px-4 py-2 items-center'>
        <div>
        <Image src={logo} alt='logo' width={200} height={200} className='dark:drop-shadow-[1px_0.5px_0.5px_white]' />
        </div>
        <div>
         <ModeToggle />
        </div>
        <div>
            Login/Signup
        </div>
    </div>
  )
}

export default Navbar