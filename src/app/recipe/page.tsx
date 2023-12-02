import { UserRole } from "@/app/user/usermodel";
import Frame from "@/components/frame/frame";
import UIButton, { ButtonType } from "@/components/ui/button";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import RecipeList from "./recipe-list";

export default async function RecipeHomePage({
    searchParams
}: {
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
            orderBy: {
                updatedAt: "desc"
            }
        }), trendingRecipes = await prisma.recipe.findMany({
            take: 10,
            where: { deletedAt: null },
            include: { cuisineType: true },
            orderBy: {
                fUserRecipeLikes: {
                    _count: "desc"
                }
            }
        });
        body = <>
            <RecipeList recipes={recipes} title="Recent Recipes"/>
            <RecipeList recipes={trendingRecipes} title="Trending Recipes" />
            </>;
    }
    let editorialButtons = <></>;
    if (
        checkUser.userType === UserRole.Admin ||
        checkUser.userType === UserRole.SuperAdmin
    ) {
        editorialButtons = (
            <div className="pt-16">
                <Link href="/recipe/create">
                    <UIButton
                        title={"Create"}
                        buttonType={ButtonType.default}
                    />
                </Link>
            </div>
        );
    }

    return (
        <Frame
            userRole={checkUser.userType}
            userName={checkUser.userName}
            body={
                <>
                    {body} {editorialButtons}
                </>
            }
            searchParams={searchParams}
        />
    );
}
