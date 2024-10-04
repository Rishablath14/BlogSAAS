"use client";
import Image from "next/image";
import AboutImage from "@/public/home.png";

export function AboutSection() {
  return (
    <section id="about" className="relative py-8 md:py-16 mb-2 sm:mb-6 lg:mb-8">
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
        <div className="mt-12">
              <p className="mb-4 text-lg text-primary">Everything you need to create, manage, and grow your blog.</p>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "SEO Optimization", description: "Built-in AI SEO tools." },
                  { title: "Content Management", description: "Easily create, edit, and organize your blog posts." },
                  { title: "Analytics Dashboard", description: "Blog's Detailed Analytics Dashboard." },
                  { title: "Manage Channels", description: "Create, edit, and manage your blog channels." },
                  { title: "Manage Channel Editors", description: "Add editors and collaborate with your team." },
                  { title: "Monetization Tools", description: "Integrate ads, sponsorships, and marketing easily." },
                ].map((feature, index) => (
                  <div key={index} className="overflow-hidden shadow shadow-zinc-800 rounded-lg">
                    <div className="px-4 py-5 sm:p-4">
                      <h3 className="text-lg font-bold text-black dark:text-white">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      </div>
    </section>
  );
}
