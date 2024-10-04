"use client"
import Image from 'next/image'
import logo from '@/public/RLexiconLogo.svg'
import React from 'react'
import { ModeToggle } from './ThemeToggler'
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { CircleUser } from 'lucide-react'
import { useUserInfo } from './AppContext'

const Navbar = () => {
  const {userInfo}:any = useUserInfo();
  return (
    <div className="fixed backdrop-blur-md shadow-md z-50 flex w-full px-2 sm:px-4 md:px-6 mx-auto items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="dark:drop-shadow-[1px_0.5px_0.5px_white]"
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
              <LoginLink>
                <Button className="font-light">Signin / Signup</Button>
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
                  {userInfo?.profileImage ? (
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
                {userInfo?.role !== "READER" &&
              <Link href="/dashboard" className="hover:underline mt-2 cursor-pointer bg-primary text-primary-foreground p-2 rounded-[10px]">
                Dashboard
              </Link>
                }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
  )
}

export default Navbar