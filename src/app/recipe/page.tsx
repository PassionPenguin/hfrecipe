import prisma from "@/lib/prisma";
import React from "react";
import RecipeList from "./recipe-list";
import { protectRoutes } from "@/lib/protectRoutes";
import Frame from "@/components/frame/frame";

export default async function RecipeHomePage({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  let body: React.ReactElement,
    checkUser = protectRoutes();
  if (!checkUser.status) {
    body = <>NO PERMISSION</>;
  } else {
    const recipes = await prisma.recipe.findMany({
      where: { deletedAt: null },
      include: { cuisineType: true },
    });
    body = <RecipeList recipes={recipes} />;
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
