import { UserRole } from "@/app/user/usermodel";
import Frame from "@/components/frame/frame";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import prisma from "@/lib/prisma";
import React from "react";
import ToolList from "./tool-list";

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
        const tools = await prisma.tool.findMany({
            where: { deletedAt: null }
        });
        body = <ToolList tools={tools} />;
    }
    let editorialButtons = <></>;
    if (
        checkUser.userType === UserRole.Admin ||
        checkUser.userType === UserRole.SuperAdmin
    ) {
        editorialButtons = <></>;
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
