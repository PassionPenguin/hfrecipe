import UploadContent from "@/app/graph/upload/upload-content";
import Frame from "@/components/frame/frame";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import React from "react";

export default function uploadImage({
    searchParams
}: {
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}) {
    let body: React.ReactElement,
        checkUser = protectServerRoutes();
    body = <UploadContent />;

    return (
        <Frame
            userRole={checkUser.userType}
            userName={checkUser.userName}
            body={body}
            searchParams={searchParams}
        />
    );
}
