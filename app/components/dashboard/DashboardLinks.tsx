"use client";

import React from "react"; // Import React for JSX
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data"; // Assuming navLinks is an array of links with {name, href, icon} structure
import { cn } from "@/lib/utils"; // Utility function for class names
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLinks({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname(); // Get the current path
  const [open, setOpen] = React.useState(false); // State to manage mobile menu toggle

  return (
    <>
      {/* Mobile Navigation */}
      {mobile ? (
        <div className="md:hidden">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </Button>

          {/* Mobile Menu */}
          {open && (
            <div className="fixed top-14 left-0 w-full bg-[#ffffffab] dark:bg-[#000000b6] backdrop-blur-md z-50 transition-all">
              <ul className="flex flex-col py-4 items-center gap-4 md:gap-6 justify-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={cn(
                pathname === link.href
                  ? "bg-muted text-primary"
                  : "text-muted-foreground bg-none",
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70"
              )}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* Desktop Navigation Links */
          navLinks.map((item) => (
            <Link
            href={item.href}
            key={item.name}
            className={cn(
              pathname == item.href
                ? "bg-muted text-primary"
                : "text-muted-foreground bg-none",
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70"
            )}
          >
            <item.icon className="size-4" />
            {item.name}
          </Link>
          ))
      )}
    </>
  );
}
