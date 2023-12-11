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
        servingsMultiplier: parseInt(
            formData.get("servingsMultiplier") as string
        ),
        odCover: formData.get("odCover") as string,
        cuisineTypeId: formData.get("cuisineTypeId") as string,
        steps: formData.get("steps") as string,
        tips: formData.get("tips") as string
    };

    let origin = req.headers.get("origin"),
        path: string;

    try {
        let result = await prisma.recipe.update({
            where: { publicId: data.publicId },
            data: {
                publicId: data.publicId,
                title: data.title,
                description: data.description,
                servingsMultiplier: data.servingsMultiplier,
                odCover: data.odCover,
                cuisineTypeId: data.cuisineTypeId,
                steps: data.steps,
                tips: data.tips
            }
        });

        if (result) {
            path = `/recipe/${data.publicId}?state=true`;
        } else {
            path = `/recipe/edit/${data.publicId}?state=false&msg=Failed%20submitting%20recipe`;
        }
    } catch (e: any) {
        path = `/recipe/edit/${data.publicId}?state=false&msg=${e.toString()}`;
    }
    revalidatePath(path);
    return NextResponse.redirect(origin + path, 303);
}
