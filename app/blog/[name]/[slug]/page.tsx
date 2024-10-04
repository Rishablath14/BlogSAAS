import { RenderArticle } from "@/app/components/dashboard/RenderArticle";
import prisma from "@/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";
import Blog from "@/app/components/Blog";

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      catSlug: true,
      createdAt: true,
      User: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        }
      },
      comments: {
        select: {
          id: true,
          desc: true,
          createdAt: true,
          User: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            }
          }
        }
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function SlugRoute({
  params,
}: {
  params: { slug: string; name: string };
}) {
  const data = await getData(params.slug);
  return (
    <>
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button size="icon" variant="outline" asChild>
          <Link href={`/blog/${params.name}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <span className="text-xl font-medium">Go Back</span>
      </div>
      <Blog blog={data}/>
    </>
  );
}
