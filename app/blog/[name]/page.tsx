import prisma from "@/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/public/RLexiconLogo.svg";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Defaultimage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getData(subDir: string) {
  const data = await prisma.channel.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      imageUrl: true,
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getData(params.name);
  return (
    <>
      <div className="grid grid-cols-3 my-10">
        <Button asChild variant="outline" className="text-lg font-medium">
          <Link href={"/blogs"} className="flex gap-2">
          <ArrowLeft/>Go Back
          </Link>
        </Button>
        <div className="col-span-1" />
        <div className="flex items-center gap-x-4 justify-center">
          <Image src={data?.imageUrl ?? Logo} alt="logo" width={100} height={100} />
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">{data.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {data.posts.map((item) => (
          <Card key={item.id}>
            <Image
              src={item.image ?? Defaultimage}
              alt={item.title}
              className="rounded-t-lg object-cover w-full h-[200px]"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{item.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${params.name}/${item.slug}`}>
                  Read more
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
