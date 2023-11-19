import prisma from "@/lib/prisma";
import React from "react";
import RecipeList from "./recipe-list";
import Frame from "@/components/frame/frame";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";

export default async function RecipeHomePage({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  let body: React.ReactElement,
    checkUser = protectServerRoutes();
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
