import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }

    let formData = await req.json(),
        userId = formData["userId"],
        recipeId = formData["recipeId"];

    try {
        let record = await prisma.fUserRecipeLikes.findUnique({
            where: {
                recipeId_userId: {
                    userId: userId,
                    recipeId: recipeId
                }
            }
        });

        if (record) {
            await prisma.fUserRecipeLikes.delete({
                where: {
                    recipeId_userId: {
                        userId: userId,
                        recipeId: recipeId
                    }
                }
            });
            return NextResponse.json({ success: true, like: false });
        } else {
            await prisma.fUserRecipeLikes.create({
                data: {
                    userId: userId,
                    recipeId: recipeId
                }
            });
            return NextResponse.json({ success: true, like: true });
        }
    } catch (e: any) {
        return NextResponse.json({ success: false });
    }
}
