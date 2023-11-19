import { protectAPIRoutes } from "@/lib/auth/protectAPIRoutes";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let checkStatus = protectAPIRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }

    const result = await prisma.ingredient.findMany({});
    if (result) {
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } else {
        return new NextResponse(
            JSON.stringify({ reason: "Failed to get ingredients." }),
            { status: 500 }
        );
    }
}
