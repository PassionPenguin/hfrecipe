import prisma from "../../../lib/prisma";
import React from "react";
import RecipeDetail from "../../../components/recipe-detail";

export default async function RecipeDetailPage({ params }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      publicId: String(params?.id),
    },
    include: {
      cuisineType: true,
    },
  });

  return <RecipeDetail recipe={recipe} />;
}
