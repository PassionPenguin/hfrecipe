import Link from "next/link";
import Recipe from "@/lib/models/recipe";
import RecipeItem from "@/app/recipe/recipe-item";

export default function RecipeList({
  recipes,
}: Readonly<{ recipes: Recipe[] }>) {
  return (
    <>
      <h1 className="text-4xl font-bold">All recipes</h1>
      {recipes.map((recipe) => (
        <RecipeItem recipe={recipe} key={recipe.publicId} />
      ))}
    </>
  );
}
