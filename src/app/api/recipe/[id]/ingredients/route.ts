import {protectAPIRequestRoutes, protectRequestRoutes} from "@/lib/auth/protectRequestRoutes";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {NextRequest, NextResponse} from "next/server";
import {NextApiRequest} from "next";

export async function GET(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({error: "NO PERMISSION"});
    }

    let origin = req.nextUrl.origin,
        path = req.nextUrl.pathname,
        recipeId: string;

    // path: "/api/recipe/[id]/ingredients"
    recipeId = path.substring(12, path.lastIndexOf("/"));

    try {
        let result = await prisma.fRecipeIngredient.findMany({
            where: {recipeId: recipeId},
            include: {
                ingredient: true
            }
        });

        if (result) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({error: "NO RESULT"});
        }
    } catch (e: any) {
        return NextResponse.json({error: e});
    }
}
