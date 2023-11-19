import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { encodeSession, Session } from "@/lib/auth/auth";
import { protectAPIRoutes } from "@/lib/auth/protectAPIRoutes";

export async function POST(req: NextRequest) {
  let checkStatus = protectAPIRoutes(req);
  if (!checkStatus.status) {
    return NextResponse.json({ error: "NO PERMISSION" });
  }

  let formData = await req.formData();

  const data = {
    name: formData.get("name") as string,
    password: formData.get("password") as string,
  };

  let origin = req.headers.get("origin"),
    path: string,
    session: Session,
    headers = {};

  try {
    let result = await prisma.user.findFirst({
      where: {
        title: data.name,
        password: data.password,
      },
      select: {
        publicId: true,
        title: true,
        role: true,
      },
    });

    if (result) {
      session = {
        id: result.publicId,
        dateCreated: Date.now(),
        name: result.title,
        role: result.role,
        issued: Date.now(),
        expires: 1000 * 60 * 60 * 24 * 7 * 4,
      };
      path = `/?state=true&msg=Signed in as ${result.title}`;
    } else {
      path = `/user/signin?state=false&msg=Incorrect username or password`;
    }
  } catch (e: any) {
    path = `/user/signin?state=false&msg=${e.toString()}`;
  }
  if (session) {
    let encodedSession = encodeSession(process.env.JWT_SECRET, session);
    headers = {
      "Set-Cookie": `TOKEN=${
        encodedSession.token
      }; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
        encodedSession.expires,
      ).toUTCString()}`,
    };
  }

  revalidatePath(path);
  return NextResponse.redirect(origin + path, {
    status: 303,
    headers: headers,
  });
}
