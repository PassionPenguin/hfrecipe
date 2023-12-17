import Recipe from "@/lib/models/recipe";
import { RecipeCard } from "./recipe-item";

export default function RecipeList({
    title,
    recipes
}: Readonly<{ title: string; recipes: Recipe[] }>) {
    return (
        <>
            <div className="mx-auto max-w-6xl">
                <h2 className="my-8 text-4xl font-bold">{title}</h2>
                <div className="flex overflow-x-auto">
                    {recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.publicId} />
                    ))}
                </div>
            </div>
        </>
    );
}
