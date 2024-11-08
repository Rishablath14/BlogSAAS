import Link from "next/link";
import { ReactNode } from "react";
import Logo from '@/public/RLexiconLogo.svg'
import React from 'react'
import { ModeToggle } from '@/components/ThemeToggler'
import Image from "next/image";
import { CircleUser, DollarSign, Globe, Home,Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DashboardLinks } from "../components/dashboard/DashboardLinks";
import { requireUserDB } from "@/utils/requireUser";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUserDB();
  if(!user) {redirect("/api/auth/login");}
  if(user?.role==="READER"){redirect("/#pricing");}
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={Logo} alt='logo' priority width={200} height={200} className='dark:drop-shadow-[1px_0.5px_0.5px_gray]' />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2  font-medium lg:px-4">
              <DashboardLinks />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex z-10 backdrop-blur-md md:backdrop-blur-none fixed md:relative w-full h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex md:hidden items-center gap-2">
          <Image
            src={Logo}
            alt="logo"
            width={200}
            height={200}
            className="w-[150px] sm:w-[200px]  dark:drop-shadow-[1px_0.5px_0.5px_white]"
          />
        </Link>
          <div className="ml-auto flex items-center gap-x-5">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {user?.profileImage?<Image src={user.profileImage} alt='logo' width={50} height={50} className='rounded-full w-auto h-auto' />:<CircleUser className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <LogoutLink>Log out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DashboardLinks mobile/>
          </div>
        </header>
        <main className="flex flex-1 pt-20 md:pt-4 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
}
