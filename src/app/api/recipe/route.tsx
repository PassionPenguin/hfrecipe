import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }

    const result = await prisma.recipe.findUnique({
        where: {
            publicId: req.headers.get("id")
        },
        include: {
            cuisineType: true
        }
    });
    if (result) {
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } else {
        return new NextResponse(
            JSON.stringify({ reason: "Failed to get recipe." }),
            { status: 500 }
        );
    }
}
