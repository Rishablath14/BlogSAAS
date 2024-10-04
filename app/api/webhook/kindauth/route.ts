import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import prisma from "@/utils/db";
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
      case "user.authenticated":
        // create a user in our database
        const user = event.data.user;
        console.log(event.data);
        let dbUser = await prisma.user.findUnique({
            where: {
              id: user.id,
            },
          });
        
          if (!dbUser) {
         dbUser = await prisma.user.create({
              data: {
                id: user.id,
                firstName: user.first_name ?? "",
                lastName: user.last_name ?? "",
                email: user.email ?? "",
                customerId: "",
                profileImage:
                  user.picture ?? "https://rlexicon.vercel.app/user.png",
              },
            });
        }
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