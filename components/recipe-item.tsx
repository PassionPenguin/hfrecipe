import Link from "next/link";
import Recipe from "../lib/models/recipe";

export default function RecipeItem({ recipe }: Readonly<{ recipe: Recipe }>) {
  return (
    <>
      <Link href={`/recipe/${recipe.publicId}`}>
        <h1>{recipe.title}</h1>
      </Link>
      <p>{recipe.description}</p>
    </>
  );
}
