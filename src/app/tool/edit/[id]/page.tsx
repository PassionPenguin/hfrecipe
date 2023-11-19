import Frame from "@/components/frame/frame";
import { InputType, UIInput } from "@/components/ui/input";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

export default async function ToolCreatePage({
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
        let tool = await prisma.tool.findFirst({
            where: { publicId: params.id }
        });

        body = (
            <div>
                <form
                    action="/api/tool/update"
                    method="POST"
                    className="space-y-4"
                >
                    <h1 className="py-4 text-3xl font-bold">
                        Editing Tool{" "}
                        <code className="rounded bg-gray-200 px-2 font-mono dark:bg-gray-800">
                            {tool.publicId}
                        </code>
                    </h1>
                    <UIInput
                        type={InputType.hidden}
                        name="publicId"
                        title={"Public ID"}
                        defaultValue={tool.publicId}
                        readOnly
                    />
                    <UIInput
                        type={InputType.text}
                        name="title"
                        title="Title"
                        defaultValue={tool.title}
                        placeholder="Title..."
                    />
                    <UIInput
                        type={InputType.text}
                        name="description"
                        title="Description"
                        defaultValue={tool.description}
                        placeholder="Description..."
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
                        href={"/tool/" + tool.publicId}
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
