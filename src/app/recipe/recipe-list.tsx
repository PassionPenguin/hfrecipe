import Recipe from "@/lib/models/recipe";
import {RecipeCard} from "./recipe-item";

export default function RecipeList({
                                       recipes
                                   }: Readonly<{ recipes: Recipe[] }>) {
    return (
        <>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold my-8">All recipes</h1>
                <div className="overflow-x-auto flex">
                    {recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.publicId}/>
                    ))}
                </div>
            </div>
        </>
    );
}
