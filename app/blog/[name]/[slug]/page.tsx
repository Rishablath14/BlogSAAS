import { RenderArticle } from "@/app/components/dashboard/RenderArticle";
import prisma from "@/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";
import Blog from "@/app/components/Blog";
import { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      catSlug: true,
      updatedAt: true,
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

export async function generateMetadata(
  { params }: {
    params: { slug: string; name: string };
  },
){
  let post = await getData(params.slug);
  if (!post) {
    return;
  }
   
  let title = post?.title
  let publishedAt = post?.createdAt
  let summary = post?.smallDescription
  let image = post?.image

  return {
    title,
    summary,
    openGraph: {
      title,
      summary,
      type: "article",
      publishedAt,
      url: `${baseUrl}/blog/${params.name}/${params.slug}`,
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

export default async function SlugRoute({
  params,
}: {
  params: { slug: string; name: string };
}) {
  const data = await getData(params.slug);
  const comments = await prisma.comment.findMany({
    where: {
      postSlug: params.slug
    },
    orderBy: {
      createdAt: 'desc'
    },
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
  })
  return (
    <>
    <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            datePublished: data.createdAt,
            dateModified: data.updatedAt,
            description: data.smallDescription,
            image: data.image,
            url: `${baseUrl}/blog/${params.name}/${params.slug}`,
            author: {
              "@type": "Person",
              name: `${data.User?.firstName} ${data.User?.lastName}`,
            },
          }),
        }}
      />
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button size="icon" variant="outline" asChild>
          <Link href={`/blog/${params.name}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <span className="text-xl font-medium">Go Back</span>
      </div>
      <Blog blog={data} comments={comments}/>
    </>
  );
}
