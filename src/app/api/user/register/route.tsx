import { Session, encodeSession, hashPassword } from "@/lib/auth/auth";
import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
import nanoid from "@/lib/nanoid";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }

    let formData = await req.formData();

    const data = {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        code: formData.get("code") as string,
        password: formData.get("password") as string
    };

    let origin = req.headers.get("origin"),
        path: string,
        session: Session,
        headers = {};

    try {
        let codeResult = await prisma.userCode.findFirst({
            where: {
                code: data.code,
                expired: false
            }
        });
        if (codeResult != null) {
            let id = nanoid({ length: 12 });
            let result = await prisma.user.create({
                data: {
                    publicId: id,
                    email: data.email,
                    title: data.name,
                    password: await hashPassword(data.password)
                }
            });

            if (result) {
                session = {
                    id: id,
                    dateCreated: Date.now(),
                    name: result.title,
                    role: result.role,
                    issued: Date.now(),
                    expires: 86400000
                };
                path = `/?state=true&msg=Registered and signed in as ${result.title}`;
            } else {
                path = `/user/register?state=false&msg=Failed creating account`;
            }
        } else {
            path = "/user/register?state=false&msg=Invalid code";
        }
    } catch (e: any) {
        path = `/user/register?state=false&msg=${e.toString()}`;
    }
    if (session) {
        let encodedSession = encodeSession(process.env.CRYPTO_SALT, session);
        headers = {
            "Set-Cookie": `TOKEN=${
                encodedSession.token
            }; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
                encodedSession.expires
            ).toUTCString()}`
        };
    }
    revalidatePath(path);
    return NextResponse.redirect(origin + path, {
        status: 303,
        headers: headers
    });
}
