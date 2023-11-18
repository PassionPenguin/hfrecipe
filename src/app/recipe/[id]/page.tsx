import prisma from "@/lib/prisma";
import React from "react";
import RecipeDetail from "../recipe-detail";
import { protectRoutes } from "@/lib/protectRoutes";
import Frame from "@/components/frame/frame";

export default async function RecipeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let body: React.ReactElement,
    checkUser = protectRoutes();
  if (!checkUser.status) {
    body = <>NO PERMISSION</>;
  } else {
    const recipe = await prisma.recipe.findUnique({
      where: {
        publicId: String(params?.id),
      },
      include: {
        cuisineType: true,
      },
    });

    body = (
      <>
        <RecipeDetail recipe={recipe} userRole={checkUser.userType} />
      </>
    );
  }

  return (
    <Frame
      userRole={checkUser.userType}
      userName={checkUser.userName}
      body={body}
      searchParams={searchParams}
    />
  );
}
