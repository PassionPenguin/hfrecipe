import Recipe from "@/lib/models/recipe";
import {RecipeCard} from "./recipe-item";

export default function RecipeList({
                                       title,
                                       recipes
                                   }: Readonly<{ title: string, recipes: Recipe[] }>) {
    return (
        <>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold my-8">{title}</h2>
                <div className="overflow-x-auto flex">
                    {recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.publicId}/>
                    ))}
                </div>
            </div>
        </>
    );
}
