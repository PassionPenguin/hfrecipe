import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import React from "react";
import Frame from "../components/frame/frame";
import prisma from "../lib/prisma";
import RecipeList from "./recipe/recipe-list";

export default async function Home({
    params,
    searchParams
}: {
    params: {
        id: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}) {
    let body: React.ReactElement,
        checkUser = protectServerRoutes();
    if (!checkUser.status) {
        body = <>NO PERMISSION</>;
    } else {
        const recipes = await prisma.recipe.findMany({
                take: 10,
                where: { deletedAt: null },
                include: { cuisineType: true },
                orderBy: { updatedAt: "desc" }
            }),
            trendingRecipes = await prisma.recipe.findMany({
                take: 10,
                where: { deletedAt: null },
                include: { cuisineType: true },
                orderBy: {
                    fUserRecipeLikes: {
                        _count: "desc"
                    }
                }
            });
        body = (
            <>
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400">
                                好吃，多吃，爱吃{" "}
                                <a
                                    href="/recipe"
                                    className="font-semibold text-indigo-600 dark:text-indigo-400"
                                >
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    看看 Recipes{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="tracking-tightname text-4xl font-bold sm:text-6xl">
                                绝对管用的 Recipes
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                                吃饭第一，别的第二（烤鹅被吃掉前说的）！
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="/recipe"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    开始阅读！
                                </a>
                                <a
                                    href="/user/register"
                                    className="leading-6name text-sm font-semibold"
                                >
                                    注册 <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                            }}
                        />
                    </div>
                </div>
                <RecipeList recipes={recipes} title="Recent Recipes" />
                <RecipeList
                    recipes={trendingRecipes}
                    title="Trending Recipes"
                />
            </>
        );
    }

    return (
        <Frame
            userRole={checkUser.userType}
            userName={checkUser.userName}
            body={body}
            searchParams={searchParams}
        />
    );
}
