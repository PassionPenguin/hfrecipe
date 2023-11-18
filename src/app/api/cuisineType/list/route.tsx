import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const result = await prisma.cuisineType.findMany({});
  if (result) {
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ reason: "Failed to get cuisine types." }),
      { status: 500 },
    );
  }
}
