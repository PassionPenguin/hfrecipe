import prisma from "../lib/prisma";
import React from "react";
import RecipeItem from "../components/recipe-item";

export default async function RecipeListPage() {
  const recipes = await prisma.recipe.findMany({
    where: { deletedAt: null },
  });

  return (
    <div className="page">
      <h1>Public Feed</h1>
      <main>
        {recipes.map((recipe) => (
          <div key={recipe.publicId} className="post">
            <RecipeItem recipe={recipe} />
          </div>
        ))}
      </main>
    </div>
  );
}
