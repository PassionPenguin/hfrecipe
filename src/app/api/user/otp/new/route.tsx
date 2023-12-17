import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }
    let formData = await req.formData();
    const secret = formData.get("secret") as string,
        userId = formData.get("userId") as string;

    if (secret === undefined || userId === undefined) {
        return NextResponse.json({ error: "INVALID REQUEST" });
    }

    let result = await prisma.user.update({
        where: { publicId: userId },
        data: {
            otpSalt: secret
        }
    });

    let origin = req.nextUrl.origin;
    if ("error" in result) {
        return NextResponse.redirect(
            origin + "/user/otp/new?state=false&msg=" + result.error.toString(),
            303
        );
    } else
        return NextResponse.redirect(
            origin + "/user/otp?state=true&msg=OTP%20Secret%20Updated",
            303
        );
}
