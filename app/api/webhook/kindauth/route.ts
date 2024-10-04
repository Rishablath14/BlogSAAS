import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const jwtDecoded = jwt.decode(token, { complete: true });

    if (!jwtDecoded) {
      return NextResponse.json({
        status: 500,
        statusText: "error decoding jwt",
      });
    }

    const header = jwtDecoded.header;
    const kid = header.kid;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as JwtPayload;

    // Handle various events
    switch (event?.type) {
      case "user.created":
        // create a user in our database
        const user = event.data.user;
        if (!user || user === null || !user.id) throw new Error("Something went wrong");         
         await prisma.user.create({
              data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                customerId: "",
                profileImage:
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
              },
            });
        break;
      default:
        console.log("event not handled", event.type);
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ status: 200, statusText: "success" });
}