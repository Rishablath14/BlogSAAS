import prisma from "@/utils/db";

export const baseUrl = "https://rlexicon.vercel.app";
const getData = async () =>{
const data = await prisma.post.findMany({
    select:{
      id: true,
      createdAt: true,
      slug: true,
      image: true,
      title: true,
      smallDescription: true,
      catSlug: true,
      User: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        }
      },
      Channel: {
        select: {
          name: true,
          subdirectory: true,
        }
      }
    }
  });
  return data;
}
export default async function sitemap() {
  let blogs = await getData();
  let blogurls = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post?.Channel?.subdirectory}/${post?.slug}`,
    lastModified: post.createdAt.toISOString().split("T")[0],
    priority: 1,
  }));

  return [...blogurls];
}