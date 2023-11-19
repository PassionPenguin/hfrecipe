import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { protectRoutes } from "@/lib/auth/protectRoutes";
import { protectAPIRoutes } from "@/lib/auth/protectAPIRoutes";
import { objToString } from "@/lib/utils/deserializeObj";

export async function POST(req: NextRequest) {
  let checkStatus = protectAPIRoutes(req);
  if (!checkStatus.status) {
    return NextResponse.json({ error: "NO PERMISSION" });
  }
  let formData = await req.formData();
  const ddl = formData.get("ddl") as string;

  try {
    let result = "",
      ddls = ddl.split("\n");
    for (let i = 0; i < ddls.length; i++) {
      let r = await prisma.$executeRawUnsafe(ddls[i]);
      if (typeof r === "number")
        result += "Rows affected " + r.toString() + "\n";
      else result += objToString(r) + "\n";
    }
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
