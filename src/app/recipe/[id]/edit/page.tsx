import Dropdown from "@/components/dropdown";
import Frame from "@/components/frame/frame";
import {InputType, UIInput, UITextarea} from "@/components/ui/input";
import {protectServerRoutes} from "@/lib/auth/protectServerRoutes";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import MarkdownEditor from "@/components/ui/editor";

export default async function RecipeEditPage({
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
        let recipe = await prisma.recipe.findFirst({
                where: {publicId: params.id},
                include: {cuisineType: true}
            }),
            cuisineTypes = await prisma.cuisineType.findMany();

        body = (
            <div>
                <form
                    action={"/api/recipe/" + params.id + "/update"}
                    method="POST"
                    className="space-y-4"
                >
                    <h1 className="py-4 text-3xl font-bold">
                        Editing Recipe{" "}
                        <code className="rounded bg-gray-200 px-2 font-mono dark:bg-gray-800">
                            {recipe.publicId}
                        </code>
                    </h1>
                    <UIInput
                        type={InputType.hidden}
                        name="publicId"
                        title={"Public ID"}
                        defaultValue={recipe.publicId}
                        readOnly
                    />
                    <UIInput
                        type={InputType.text}
                        name="title"
                        title="Title"
                        defaultValue={recipe.title}
                        placeholder="Title..."
                    />
                    <UIInput
                        type={InputType.text}
                        name="description"
                        title="Description"
                        defaultValue={recipe.description}
                        placeholder="Description..."
                    />
                    <UIInput
                        type={InputType.text}
                        name="servingsMultiplier"
                        title="Servings Multiplier"
                        defaultValue={recipe.servingsMultiplier}
                        placeholder="Servings Multiplier..."
                        hint="Servings per ingredients amounts"
                    />
                    <MarkdownEditor source={recipe.steps} id="steps" title="Steps"/>
                    <MarkdownEditor source={recipe.tips} id="tips" title="Tips"/>
                    <UIInput
                        type={InputType.text}
                        name="odCover"
                        title="Cover Image"
                        placeholder="https://..."
                        defaultValue={recipe.odCover}
                    />
                    <Dropdown
                        _selected={recipe.cuisineType}
                        all={cuisineTypes}
                        name="cuisineTypeId"
                    />
                    <UIInput
                        type={InputType.submit}
                        name="submit"
                        title="Submit"
                    />
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Or{" "}
                    <Link
                        href={"/recipe/" + recipe.publicId}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
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
