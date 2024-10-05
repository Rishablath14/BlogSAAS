import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong");
  }
    
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        customerId: "",
        profileImage:
          user.picture ?? `https://rlexicon.vercel.app/media/user.png`,
      },
    });
  }
  
  const url = req.url.split("auth/creation")[1]==="/none" ? "": req.url.split("auth/creation")[1].replaceAll("(","/");
  console.log(url);
  
  return NextResponse.redirect(
    process.env.NODE_ENV === "production"
      ? "https://rlexicon.vercel.app"+url
      : "http://localhost:3000"+url
  );
}
