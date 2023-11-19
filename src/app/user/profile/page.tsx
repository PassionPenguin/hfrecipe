import Frame from "@/components/frame/frame";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { decodeUserRole, User, userAvatars } from "../usermodel";

export default async function UserProfile({
    searchParams
}: {
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}) {
    let body: React.ReactElement,
        checkUser = protectServerRoutes();
    if (checkUser.userName === null) {
        redirect("/user/signin");
    } else {
        let userName = checkUser.userName;
        let user: User;
        if (!userName && process.env.NODE_ENV == "development") {
            user = User.testData();
        } else {
            if (userName) {
                let tmp = await prisma.user.findUnique({
                    where: {
                        title: userName
                    }
                });
                tmp.role = decodeUserRole(tmp.role);
                user = tmp as unknown as User;
            } else user = User.empty();
        }
        let avatar = userAvatars.find((e) => e.avatar == user.avatar)!;
        body = (
            <>
                <div className="relative mx-auto my-8 flex max-w-6xl rounded bg-white px-8 py-4 dark:bg-slate-900">
                    <div className="-mt-8">
                        <Image
                            src={avatar.link}
                            alt={avatar.name}
                            width={160}
                            height={160}
                            className="rounded-xl border-4 border-white bg-slate-200 dark:border-slate-400 dark:bg-slate-800"
                        />
                    </div>
                    <div className="my-4 ml-8 grow">
                        <h1 className="pb-4 text-3xl font-bold leading-9 tracking-tight">
                            {user.title}
                        </h1>
                        <div className="space-y-2 text-gray-600 dark:text-gray-400">
                            <p>
                                <span className="inline-block w-[128px]">
                                    唯一识别符 ID
                                </span>
                                <span>{user.publicId}</span>
                            </p>
                            <p>
                                <span className="inline-block w-[128px]">
                                    个人简介
                                </span>
                                <span>{user.bio}</span>
                            </p>
                        </div>
                    </div>
                </div>
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
