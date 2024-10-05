"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema, SiteCreationSchema, siteSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { requireUser } from "@/utils/requireUser";
import { stripe } from "@/utils/stripe";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();


// Function to delete an image from Uploadthing
export async function deleteImageFromUploadthing(images: string[]) {
  if(images.length < 1) return;
  try {
    const res = await utapi.deleteFiles(images);
  } catch (error) {
    console.error("Error deleting image from Uploadthing:", error);
  }
}
export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const [subStatus, sites] = await Promise.all([
    prisma.subscription.findUnique({
      where: {
        userId: user?.id,
      },
      select: {
        status: true,
      },
    }),
    prisma.channel.findMany({
      where: {
        userId: user?.id,
      },
    }),
  ]);

  if (!subStatus || subStatus.status !== "active") {
    if (sites.length < 1) {
      // Allow creating a site
      const submission = await parseWithZod(formData, {
        schema: SiteCreationSchema({
          async isSubdirectoryUnique() {
            const exisitngSubDirectory = await prisma.channel.findUnique({
              where: {
                subdirectory: formData.get("subdirectory") as string,
              },
            });
            return !exisitngSubDirectory;
          },
        }),
        async: true,
      });

      if (submission.status !== "success") {
        return submission.reply();
      }

      const response = await prisma.channel.create({
        data: {
          description: submission.value.description,
          name: submission.value.name,
          subdirectory: submission.value.subdirectory,
          userId: user?.id,
        },
      });

      return redirect("/dashboard/channels");
    } else {
      // user alredy has one site dont allow
      return redirect("/dashboard/pricing");
    }
  } else if (subStatus.status === "active") {
    // User has a active plan he can create sites...
    const submission = await parseWithZod(formData, {
      schema: SiteCreationSchema({
        async isSubdirectoryUnique() {
          const exisitngSubDirectory = await prisma.channel.findUnique({
            where: {
              subdirectory: formData.get("subdirectory") as string,
            },
          });
          return !exisitngSubDirectory;
        },
      }),
      async: true,
    });

    if (submission.status !== "success") {
      return submission.reply();
    }

    const response = await prisma.channel.create({
      data: {
        description: submission.value.description,
        name: submission.value.name,
        subdirectory: submission.value.subdirectory,
        userId: user?.id,
      },
    });
    return redirect("/dashboard/channels");
  }
}
export async function createComment(comment: string,slug:string,id:string) {
  await prisma.comment.create({
    data: {
      desc: comment ?? "", // Ensure desc is inside the data property
      userId: id,
      postSlug: slug,
    },
  })
  return true;
}
export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  let dataContent;
  if(submission?.value?.content){
    const paragraphs = submission?.value?.content
      .split("\n")
      .map((paragraph) => ({
        type: "paragraph",
        content: [
          {
            type: "text",
            text: paragraph,
          },
        ],
      }));
 dataContent = {
    type: "doc",
    content: paragraphs,
  };}
  const data = await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: submission?.value?.content && submission?.value?.content.trim() ?dataContent:JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user?.id,
      content: submission.value.content?submission.value.content:"",
      catSlug:submission.value.category,
      channelId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/channels/${formData.get("siteId")}`);
}

export async function EditPostActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  let dataContent;
  if(submission?.value?.content){
    const paragraphs = submission?.value?.content
      .split("\n")
      .map((paragraph) => ({
        type: "paragraph",
        content: [
          {
            type: "text",
            text: paragraph,
          },
        ],
      }));
 dataContent = {
    type: "doc",
    content: paragraphs,
  };}
  const prevContent = await prisma.post.findUnique({
    where: {
      userId: user?.id,
      id: formData.get("articleId") as string,
    },
    select:{
      content:true
    }
  });

  const data = await prisma.post.update({
    where: {
      userId: user?.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      content: submission.value.content?submission.value.content:"",
      articleContent: submission?.value?.content && submission?.value?.content.trim() && prevContent?.content !== submission.value.content?dataContent:JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      catSlug:submission.value.category,
    },
  });

  return redirect(`/dashboard/channels/${formData.get("siteId")}`);
}

export async function DeletePost(formData: FormData) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({
    where: {
      userId: user?.id,
      id: formData.get("articleId") as string,
    },
    select: {
      image: true, // Get the image URL to delete it from Uploadthing
    },
  });
  const images = post?.image ? [post.image.substring(post.image.lastIndexOf("/") + 1)]:[];
  await deleteImageFromUploadthing(images);
  const data = await prisma.post.delete({
    where: {
      userId: user?.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/channels/${formData.get("siteId")}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.channel.update({
    where: {
      userId: user?.id,
      id: formData.get("siteId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  return redirect(`/dashboard/channels/${formData.get("siteId")}`);
}

export async function DeleteSite(formData: FormData) {
  const user = await requireUser();
  const posts = await prisma.post.findMany({
    where: {
      userId: user?.id,
      channelId: formData.get("siteId") as string,
    },
    select: {
      image: true, // Get all images associated with posts in this channel
    },
  });
  let images:string[]=[];
  posts.map(post => {
    const image = post?.image?post.image.substring(post.image.lastIndexOf("/") + 1):"";
    images.push(image);
  });
  await deleteImageFromUploadthing(images);
  const data = await prisma.channel.delete({
    where: {
      userId: user?.id,
      id: formData.get("siteId") as string,
    },
  });

  return redirect("/dashboard/channels");
}

export async function CreateFreeSubscription() {
  const user = await requireUser();
    const upd = await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        role: "AUTHOR",
      }
    });
  return redirect("/dashboard");
}
export async function CreateSubscription() {
  const user = await requireUser();
  
  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }
  await prisma.user.update({
    where: {
      id: user?.id
    },
    data: {
      role: "AUTHOR",
    }
  });
  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId.customerId as string,
    mode: "subscription",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url:
      process.env.NODE_ENV === "production"
        ? "https://rlexicon.vercel.app/payment/success"
        : "http://localhost:3000/payment/success",
    cancel_url:
      process.env.NODE_ENV === "production"
        ? "https://rlexicon.vercel.app/payment/cancelled"
        : "http://localhost:3000/payment/cancelled",
  });

  return redirect(session.url as string);
}
