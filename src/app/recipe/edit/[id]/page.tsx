import Link from "next/link";
import Dropdown from "@/components/dropdown";
import prisma from "@/lib/prisma";
import Frame from "@/components/frame/frame";
import React from "react";
import {protectServerRoutes} from "@/lib/auth/protectServerRoutes";
import {InputType, UIInput, UITextarea} from "@/components/ui/input";

export default async function RecipeCreatePage({
                                                   params,
                                                   searchParams,
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
        let recipe = await prisma.recipe.findFirst({
                where: {publicId: params.id},
                include: {cuisineType: true},
            }),
            cuisineTypes = await prisma.cuisineType.findMany();

        body = (
            <div>
                <form action="/api/recipe/update" method="POST" className="space-y-4">
                    <h1 className="font-bold text-3xl py-4">
                        Editing Recipe{" "}
                        <code className="font-mono bg-gray-200 dark:bg-gray-800 px-2 rounded">
                            {recipe.publicId}
                        </code>
                    </h1>
                    <UIInput type={InputType.hidden} name="publicId" title={"Public ID"} defaultValue={recipe.publicId}/>
                    <UIInput type={InputType.text} name="title" title="Title" defaultValue={recipe.title}
                             placeholder="Title..."/>
                    <UIInput type={InputType.text} name="description" title="Description" defaultValue={recipe.description}
                             placeholder="Description..."/>
                    <UIInput type={InputType.text} name="servingsMultiplier" title="Servings Multiplier"
                             defaultValue={recipe.servingsMultiplier} placeholder="Servings Multiplier..."
                             hint="Servings per ingredients amounts"/>
                    <UITextarea name="steps" title="Steps" defaultValue={recipe.steps}/>
                    <UITextarea name="tips" title="Tips" defaultValue={recipe.tips}/>
                    <Dropdown
                        _selected={recipe.cuisineType}
                        all={cuisineTypes}
                        name="cuisineTypeId"
                    />
                    <UIInput type={InputType.submit} name="submit" title="Submit"/>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Or{" "}
                    <Link
                        href={"/recipe/" + recipe.publicId}
                        className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                    >
                        Cancel
                    </Link>
                </p>
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
