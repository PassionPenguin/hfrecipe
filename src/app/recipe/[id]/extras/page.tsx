import Frame from "@/components/frame/frame";
import {protectServerRoutes} from "@/lib/auth/protectServerRoutes";
import prisma from "@/lib/prisma";
import React from "react";
import ExtrasEditor from "@/app/recipe/[id]/extras/content";
import UIButton, {ButtonType} from "@/components/ui/button";
import Link from "next/link";

export default async function RecipeExtraPage({
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
        let ingredients = (await prisma.fRecipeIngredient.findMany({
                where: {
                    recipeId: params.id
                }, include: {
                    ingredient: {select: {title: true}}
                }
            })).map(e => `${e.ingredient.title}-${e.amount}-${e.unit}`).join("|"),
            tools = (await prisma.fRecipeTool.findMany({
                where: {
                    recipeId: params.id
                }, include: {
                    tool: {select: {title: true}}
                }
            })).map(e => `${e.tool.title}-${e.amount}-${e.unit}`).join("|");

        console.log(typeof tools);

        body = (
            <div className="space-y-4">
                <h1 className="py-4 text-3xl font-bold">
                    Editing Recipe{" "}
                    <code className="rounded bg-gray-200 px-2 font-mono dark:bg-gray-800">
                        {params.id}
                    </code>
                </h1>
                <div>
                    <h2 className="py-4 text-2xl font-bold">
                        Ingredients
                    </h2>
                    <ExtrasEditor recipeId={params.id} tableName="fRecipeIngredient" extrasName="ingredient"
                                  _extras={ingredients}/>
                </div>
                <div>
                    <h2 className="py-4 text-2xl font-bold">
                        Tools
                    </h2>
                    <ExtrasEditor recipeId={params.id} tableName="fRecipeTool" extrasName="tool" _extras={tools}/>
                </div>
                <hr/>
                <Link href={"/recipe/" + params.id} className="block w-fit mx-auto">
                    <UIButton title="Back to Recipe" buttonType={ButtonType.default}/>
                </Link>
            </div>
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
