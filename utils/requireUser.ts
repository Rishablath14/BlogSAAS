"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./db";

export const requireUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  return user;
};
export const requireUserDB = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
    
  if (!user) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return dbUser;
};
