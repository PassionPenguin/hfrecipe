import ReactMarkdown from "react-markdown";
import Recipe from "@/lib/models/recipe";
import Link from "next/link";
import ExtendedImage from "@/components/ui/extended-image";
import { UserRole } from "../user/usermodel";
import Loading, { LoadingSkeletonType } from "@/components/loading";
import prisma from "@/lib/prisma";

function parseIngredientUnit(unit: string) {
  let reflect = [
    { name: "g", id: "0000" },
    { name: "mL", id: "0001" },
    { name: "x", id: "0010" },
  ];
  return reflect.find((e) => e.id === unit)?.name;
}

export default async function RecipeDetail({
  recipeId,
  userRole,
}: Readonly<{
  recipeId: string;
  userRole: UserRole;
}>) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      publicId: String(recipeId),
    },
    include: {
      cuisineType: true,
      fRecipeIngredient: {
        select: {
          ingredient: {
            select: {
              title: true,
            },
          },
          amount: true,
          unit: true,
        },
      },
      fRecipeTool: {
        select: {
          tool: {
            select: {
              title: true,
            },
          },
          amount: true,
          unit: true,
        },
      },
    },
  });

  let editorialButtons = <></>;
  if (userRole === UserRole.Admin || userRole === UserRole.SuperAdmin) {
    editorialButtons = (
      <div className="pt-16">
        <Link href={"/recipe/edit/" + recipe.publicId}>
          <button className="px-4 py-2 text-slate-900 rounded hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300 border-2 border-slate-900 dark:border-slate-100">
            Edit
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-serif text-5xl font-bold py-4">{recipe.title}</h1>
      <p className="border-l-4 text-xl border-gray-500 pl-4 text-gray-600 dark:text-gray-400 py-2 my-2">
        {recipe.description}
      </p>
      <h2 className="text-3xl font-bold py-4" id="ingredients">
        Ingredients
      </h2>
      <ul>
        {recipe.fRecipeIngredient.map((ingredient, index) => (
          <li key={index}>
            {ingredient.ingredient.title} {ingredient.amount}{" "}
            {parseIngredientUnit(ingredient.unit)}
          </li>
        ))}
      </ul>
      <h2 className="text-3xl font-bold py-4" id="tools">
        Tools
      </h2>
      <ul>
        {recipe.fRecipeTool.map((tool, index) => (
          <li key={index}>
            {tool.tool.title}
            {index !== recipe.fRecipeTool.length - 1 ? ", " : ""}
          </li>
        ))}
      </ul>
      <h2 className="text-3xl font-bold py-4" id="step">
        Steps
      </h2>
      <ReactMarkdown
        className="py-4 space-y-4 markdown"
        components={{
          img(props) {
            return (
              <>
                <ExtendedImage
                  src={props.src}
                  alt={props.alt}
                  className="py-2 rounded-lg lg:max-w-[600px] md:max-w-[480px] sm:max-w-[360px] mx-auto"
                />
                <span className="text-center text-base text-gray-600 dark:text-gray-400 block">
                  {props.alt}
                </span>
              </>
            );
          },
        }}
      >
        {recipe.steps}
      </ReactMarkdown>
      <hr />
      <h2 className="text-3xl font-bold py-4" id="tips">
        Tips
      </h2>
      <ReactMarkdown className="py-4 space-y-4 markdown" components={{}}>
        {recipe.tips}
      </ReactMarkdown>
      {editorialButtons}
    </>
  );
}
