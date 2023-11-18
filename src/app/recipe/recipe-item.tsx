import Link from "next/link";
import Recipe from "@/lib/models/recipe";

export default function RecipeItem({ recipe }: Readonly<{ recipe: Recipe }>) {
  return (
    <div className="py-4">
      <Link href={`/recipe/${recipe.publicId}`}>
        <p className="text-3xl font-bold py-2">{recipe.title}</p>
      </Link>
      <p className="">{recipe.description}</p>
      <p className="text-xs">
        {recipe.cuisineType.title} | {recipe.estimatedTime}
      </p>
    </div>
  );
}
