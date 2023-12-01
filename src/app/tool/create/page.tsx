import Dropdown from "@/components/dropdown";
import Frame from "@/components/frame/frame";
import { InputType, UIInput, UITextarea } from "@/components/ui/input";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import nanoid from "@/lib/nanoid";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

export default async function IngredientCreatePage({
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
        const publicId = nanoid({});
        body = (
            <div>
                <form
                    action="/api/tool/create"
                    method="POST"
                    className="space-y-4"
                >
                    <h1 className="py-4 text-3xl font-bold">New Tool</h1>
                    <UIInput
                        type={InputType.hidden}
                        name="publicId"
                        title={"Public ID"}
                        defaultValue={publicId}
                        readOnly
                    />
                    <UIInput
                        type={InputType.text}
                        name="title"
                        title="Title"
                        placeholder="Title..."
                    />
                    <UIInput
                        type={InputType.text}
                        name="description"
                        title="Description"
                        placeholder="Description..."
                    />
                    <UIInput
                        type={InputType.submit}
                        name="submit"
                        title="Create Ingredient"
                    />
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Or{" "}
                    <Link
                        href="/"
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
