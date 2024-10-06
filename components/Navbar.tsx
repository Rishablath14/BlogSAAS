"use client"
import Image from 'next/image'
import logo from '@/public/RLexiconLogo.svg'
import React from 'react'
import { ModeToggle } from './ThemeToggler'
import { LoginLink,LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { CircleUser } from 'lucide-react'
import { useUserInfo } from './AppContext'
import { usePathname,useParams } from 'next/navigation'

const Navbar = () => {
  const {userInfo}:any = useUserInfo();
  const path = usePathname();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed backdrop-blur-md shadow-md z-50 flex w-full px-2 sm:px-4 md:px-6 mx-auto items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="w-[150px] sm:w-[200px]  dark:drop-shadow-[1px_0.5px_0.5px_white]"
          />
        </Link>
        <ul className="hidden md:flex items-center gap-4 md:gap-6 justify-center ">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link scroll href="/blogs" className="hover:underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/#pricing" className="hover:underline">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex justify-end space-x-4">
          <ModeToggle />
          {userInfo===null ? (
            <>
              <LoginLink postLoginRedirectURL={"/api/auth/creation" + `${path==="/"?"/none":"/"+path.slice(1).replaceAll("/","(")}`}>
                <Button className="font-light">Login</Button>
              </LoginLink>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {userInfo && userInfo?.profileImage ? (
                    <Image
                      src={userInfo.profileImage}
                      alt="logo"
                      width={50}
                      height={50}
                      className="rounded-full w-auto h-auto"
                    />
                  ) : (
                    <CircleUser className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <LogoutLink className="bg-destructive mt-1 cursor-pointer">Log out</LogoutLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                {userInfo && userInfo?.role !== "READER" &&
              <Link href="/dashboard" className="hover:underline mt-2 cursor-pointer bg-primary text-primary-foreground p-2 rounded-[10px]">
                Dashboard
              </Link>
                }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        <div className="md:hidden">
        <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen(!open)}
                >
                {open===true
                ?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                :<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>}
              </Button>
        </div>
      </div>
        { open===true &&
        <div className='transition-all fixed w-full -mx-2 top-14 md:hidden bg-[#ffffffab] dark:bg-[#000000b6]'>
          <ul className="flex w-full flex-col py-2 items-center gap-4 md:gap-6 justify-center backdrop-blur-md">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link scroll href="/blogs" className="hover:underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/#pricing" className="hover:underline">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
    </div>

    }
      </div>
  )
}

export default Navbar