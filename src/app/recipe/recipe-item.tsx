import Recipe from "@/lib/models/recipe";
import Link from "next/link";

export default function RecipeItem({ recipe }: Readonly<{ recipe: Recipe }>) {
    return (
        <div className="py-4">
            <Link href={`/recipe/${recipe.publicId}`}>
                <p className="py-2 text-3xl font-bold">{recipe.title}</p>
            </Link>
            <p className="">{recipe.description}</p>
            <p className="text-xs">
                {recipe.cuisineType.title} | {recipe.estimatedTime}
            </p>
        </div>
    );
}
