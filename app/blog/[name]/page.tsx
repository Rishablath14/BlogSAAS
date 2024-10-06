import prisma from "@/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/public/RLexiconLogo.svg";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { baseUrl } from "@/app/sitemap";

async function getData(subDir: string) {
  const data = await prisma.channel.findUnique({
    where: { subdirectory: subDir },
    select: {
      name: true,
      description: true,
      imageUrl: true,
      createdAt: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          catSlug: true,
          id: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!data) return notFound();
  return data;
}

export async function generateMetadata({ params }: { params: { name: string } }) {
  let channel = await getData(params.name);
  let title = channel.name + " | RLexicon";
  let publishedAt = channel.createdAt;
  let summary = channel.description;
  let image = channel.imageUrl;

  return {
    title,
    summary,
    openGraph: {
      title,
      summary,
      type: "article",
      publishedAt,
      url: `${baseUrl}/blog/${params.name}`,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      summary,
      images: [image],
    },
  };
}

export default async function BlogIndexPage({ params }: { params: { name: string } }) {
  const data = await getData(params.name);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="outline" className="text-lg font-medium hover:bg-gray-100 transition duration-300">
          <Link href={"/blogs"} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Go Back
          </Link>
        </Button>
      </div>

      {/* Blog Header */}
      <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-4 mb-12 bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg">
        <Image src={data?.imageUrl ?? Logo} alt="logo" width={150} height={150} className="rounded-lg shadow-md" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.name}</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{data.description}</p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((item) => (
          <Card key={item.id} className="group overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
            {/* Post Image */}
            <div className="relative overflow-hidden rounded-t-lg h-56">
              <Image
                src={item.image ?? DefaultImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                width={400}
                height={200}
              />
              <div className="absolute bottom-2 right-2 backdrop-blur-md bg-[#ffffffec] dark:bg-[#00000098] bg-opacity-75 px-2 py-1 rounded-full text-xs font-medium text-black dark:text-white font-semibold">
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(item.createdAt)}
              </div>
            </div>

            {/* Post Content */}
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-orange-500 transition duration-300">
                {item.title}
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-400 text-sm line-clamp-3 mt-1">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>

            {/* Read More Button */}
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                <Link href={`/blog/${params.name}/${item.slug}`}>Read more</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
