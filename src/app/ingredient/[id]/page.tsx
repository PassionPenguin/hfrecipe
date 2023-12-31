import IngredientDetail from "@/app/ingredient/ingredient-detail";
import Frame from "@/components/frame/frame";
import Loading, { LoadingSkeletonType } from "@/components/loading";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import React, { Suspense } from "react";

export default async function IngredientDetailPage({
    params,
    searchParams
}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    let body: React.ReactElement,
        checkUser = protectServerRoutes();
    if (!checkUser.status) {
        body = <>NO PERMISSION</>;
    } else {
        body = (
            <>
                <div className="">
                    <div className="font-serif text-xl lg:mr-96">
                        <Suspense
                            fallback={
                                <Loading
                                    type={LoadingSkeletonType.imageAndText}
                                />
                            }
                        >
                            <IngredientDetail
                                ingredientId={params.id}
                                userRole={checkUser.userType}
                            />
                        </Suspense>
                    </div>
                </div>
                <div className="absolute right-0 top-0 mx-4 hidden px-4 py-2 lg:block">
                    <p className="py-4 font-bold">On this page</p>
                    <div className="space-y-2">
                        <p className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                            <a href="#detail"> &gt; Detail</a>
                        </p>
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
