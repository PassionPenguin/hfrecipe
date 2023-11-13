import Recipe from "../lib/models/recipe";

export default function RecipeDetail({recipe} : Readonly<{recipe: Recipe}>) {
    return <>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <p>{recipe.steps}</p>
    </>
}