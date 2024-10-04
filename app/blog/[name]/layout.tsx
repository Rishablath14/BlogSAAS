import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { type ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <Navbar/>
    <main className="max-w-7xl min-h-screen pt-20 mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </main>
    <Footer/>
    </>
  );
}
