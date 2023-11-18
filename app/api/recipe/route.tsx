import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const result = await prisma.recipe.findUnique({
    where: {
      publicId: request.headers.get("id"),
    },
    include: {
      cuisineType: true,
    },
  });
  if (result) {
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } else {
    return new NextResponse(
      JSON.stringify({ reason: "Failed to get recipe." }),
      { status: 500 },
    );
  }
}
