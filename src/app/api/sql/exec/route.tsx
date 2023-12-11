import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
import prisma from "@/lib/prisma";
import { objToString } from "@/lib/utils/deserializeObj";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }
    let formData = await req.formData();
    const ddl = formData.get("ddl") as string;

    try {
        let result = "",
            ddls = ddl.split("\n");
        console.log(ddls.join("\n") + "\n\n");
        for (let i = 0; i < ddls.length; i++) {
            let r = await prisma.$executeRawUnsafe(ddls[i]);
            console.log(r);
            if (typeof r === "number")
                result += "Rows affected " + r.toString() + "\n";
            else result += objToString(r) + "\n";
        }
        return NextResponse.json(result);
    } catch (e: any) {
        return NextResponse.json({ error: e.message });
    }
}
