import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { protectAPIRoutes } from "@/lib/auth/protectAPIRoutes";

export async function GET(req: NextRequest) {
  let checkStatus = protectAPIRoutes(req);
  if (!checkStatus.status) {
    return NextResponse.json({ error: "NO PERMISSION" });
  }

  const result = await prisma.tool.findMany({});
  if (result) {
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ reason: "Failed to get tools." }),
      { status: 500 },
    );
  }
}
