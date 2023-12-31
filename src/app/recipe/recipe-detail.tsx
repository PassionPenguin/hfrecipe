import DateTime from "@/components/ui/date";
import {
    default as ExtendedImage,
    default as LazyExtendedImage
} from "@/components/ui/extended-image";
import UserContentActions from "@/components/userContentActions";
import prisma from "@/lib/prisma";
import { parseUnit } from "@/lib/utils/extrasConverter";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { UserRole } from "../user/usermodel";

export default async function RecipeDetail({
    recipeId,
    userRole,
    userId
}: Readonly<{
    recipeId: string;
    userRole: UserRole;
    userId: string;
}>) {
    const recipe = await prisma.recipe.findUnique({
        where: {
            publicId: String(recipeId)
        },
        include: {
            cuisineType: true,
            fRecipeIngredient: {
                select: {
                    ingredient: {
                        select: {
                            publicId: true,
                            title: true
                        }
                    },
                    amount: true,
                    unit: true
                }
            },
            fRecipeTool: {
                select: {
                    tool: {
                        select: {
                            publicId: true,
                            title: true
                        }
                    },
                    amount: true,
                    unit: true
                }
            },
            fUserRecipeLikes:
                userId != null
                    ? {
                          where: {
                              userId: userId
                          }
                      }
                    : {}
        }
    });
    let recipeLikeCount = await prisma.fUserRecipeLikes.count({
        where: {
            recipeId: recipeId
        }
    });

    let titleSection = (
            <>
                {recipe.odCover !== null ? (
                    <ExtendedImage
                        src={recipe.odCover}
                        alt="Recipe Cover"
                        className="rounded-xl py-4"
                    />
                ) : (
                    <></>
                )}
                <div className="pb-8">
                    <h1 className="py-4 font-serif text-5xl font-bold">
                        {recipe.title}
                    </h1>
                    <p className="my-2 border-l-4 border-gray-500 py-2 pl-4 text-xl text-gray-600 dark:text-gray-400">
                        {recipe.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        First published <DateTime date={recipe.createdAt} />,
                        Last modified <DateTime date={recipe.updatedAt} />
                    </p>
                </div>
            </>
        ),
        preparationSection = (
            <div className="flex">
                <div className="lg:flex-1">
                    <h2 className="py-4 text-3xl font-bold" id="ingredients">
                        Ingredients
                    </h2>
                    <ul>
                        {recipe.fRecipeIngredient.map((ingredient) => (
                            <li key={ingredient.ingredient.publicId}>
                                <Link
                                    href={
                                        "/ingredient/" +
                                        ingredient.ingredient.publicId
                                    }
                                >
                                    {ingredient.ingredient.title}
                                </Link>{" "}
                                {ingredient.amount} {parseUnit(ingredient.unit)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:flex-1">
                    <h2 className="py-4 text-3xl font-bold" id="tools">
                        Tools
                    </h2>
                    <ul>
                        {recipe.fRecipeTool.map((tool) => (
                            <li key={tool.tool.publicId}>
                                <Link href={"/tool/" + tool.tool.publicId}>
                                    {tool.tool.title}
                                </Link>{" "}
                                {tool.amount} {parseUnit(tool.unit)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );

    if (userRole === UserRole.NotSignedIn) {
        let lines = recipe.steps.split("\n");
        lines = lines.slice(0, 3);
        return (
            <>
                {titleSection}
                <hr />
                {preparationSection}
                <h2 className="py-4 text-3xl font-bold" id="step">
                    Steps
                </h2>
                <ReactMarkdown
                    className="markdown space-y-4 py-4"
                    components={{
                        img(props) {
                            return (
                                <>
                                    <LazyExtendedImage
                                        src={props.src}
                                        alt={props.alt}
                                        className="mx-auto rounded-lg py-2 sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]"
                                    />
                                    <span className="block text-center text-base text-gray-600 dark:text-gray-400">
                                        {props.alt}
                                    </span>
                                </>
                            );
                        }
                    }}
                >
                    {lines.join("\n")}
                </ReactMarkdown>
                <p>Please signin to continue reading the entire recipe.</p>
                <h2 className="py-4 text-3xl font-bold" id="tips">
                    Tips
                </h2>
                <p>Please signin to continue reading the entire recipe.</p>
            </>
        );
    }

    let editorialButtons = <></>;
    if (userRole === UserRole.Admin || userRole === UserRole.SuperAdmin) {
        editorialButtons = (
            <div className="space-x-4 pt-16">
                <Link href={"/recipe/" + recipeId + "/edit"}>
                    <button className="rounded border-2 border-slate-900 px-4 py-2 text-slate-900 hover:text-slate-700 dark:border-slate-100 dark:text-slate-100 dark:hover:text-slate-300">
                        Edit
                    </button>
                </Link>
                <Link href={"/recipe/" + recipeId + "/extras"}>
                    <button className="rounded border-2 border-slate-900 px-4 py-2 text-slate-900 hover:text-slate-700 dark:border-slate-100 dark:text-slate-100 dark:hover:text-slate-300">
                        Edit Extras
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl">
            {titleSection}
            <hr />
            {preparationSection}
            <h2 className="py-4 text-3xl font-bold" id="step">
                Steps
            </h2>
            <ReactMarkdown
                className="markdown space-y-4 py-4"
                components={{
                    img(props) {
                        return (
                            <>
                                <LazyExtendedImage
                                    src={props.src}
                                    alt={props.alt}
                                    className="mx-auto rounded-lg py-2 sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]"
                                />
                                <span className="block text-center text-base text-gray-600 dark:text-gray-400">
                                    {props.alt}
                                </span>
                            </>
                        );
                    }
                }}
            >
                {recipe.steps}
            </ReactMarkdown>
            <hr />
            <h2 className="py-4 text-3xl font-bold" id="tips">
                Tips
            </h2>
            <ReactMarkdown className="markdown space-y-4 py-4" components={{}}>
                {recipe.tips}
            </ReactMarkdown>
            {editorialButtons}
            <div className="my-8" />
            <UserContentActions
                userId={userId}
                recipeId={recipe.publicId}
                currentLikeState={recipe.fUserRecipeLikes}
                currentLikeCount={recipeLikeCount}
            />
        </div>
    );
}
