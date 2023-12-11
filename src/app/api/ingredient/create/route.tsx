import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
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
        publicId: formData.get("publicId") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
    };

    let origin = req.headers.get("origin"),
        path: string;

    try {
        let result = await prisma.ingredient.create({
            data: {
                publicId: data.publicId,
                title: data.title,
                description: data.description,
            }
        });
        if (result) {
            path = `/ingredient/${data.publicId}?state=true`;
        } else {
            path = `/ingredient/create/?state=false&msg=Failed%20submitting%20ingredient`;
        }
    } catch (e: any) {
        path = `/ingredient/create/?state=false&msg=${e.toString()}`;
    }
    revalidatePath(path);
    return NextResponse.redirect(origin + path, 303);
}
