import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { encodeSession, Session } from "@/lib/auth";

export async function POST(req: Request) {
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

    console.log(result);

    if (result) {
      session = {
        id: result.publicId,
        dateCreated: Date.now(),
        name: result.title,
        role: result.role,
        issued: Date.now(),
        expires: 86400000,
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
  console.log(path, headers);
  revalidatePath(path);
  return NextResponse.redirect(origin + path, {
    status: 303,
    headers: headers,
  });
}
