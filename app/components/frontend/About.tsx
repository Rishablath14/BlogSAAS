"use client";
import Image from "next/image";
import AboutImage from "@/public/home.png";

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 mb-2 sm:mb-6 lg:mb-8">
      <div className="container mx-auto px-6 text-gray-600 dark:text-gray-300">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-12 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white leading-tight">
              About <span className="text-primary">RLexicon</span>
            </h2>
            <p className="mt-4 text-base text-justify sm:text-lg leading-relaxed">
              At RLexicon, we are on a mission to empower writers, content creators, and teams to create and manage their blogs effortlessly. Using cutting-edge technologies like <strong>Next.js 15, Prisma, and Supabase</strong>, we ensure a seamless user experience with enhanced performance, security, and scalability.
            </p>
            <p className="mt-4 text-base text-justify  sm:text-lg leading-relaxed">
              Our platform offers a rich feature set including a Notion-style editor, real-time updates, role-based access control, and a robust multi-tenant structure that adapts to your growth. Whether you&apos;re a solo blogger or part of a professional team, RLexicon provides the tools and support to bring your content to life!
            </p>
            <div className="mt-8">
              <a href="#contact" className="px-6 py-3 text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition duration-200">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <Image src={AboutImage} alt="About RLexicon" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
