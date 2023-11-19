import React, { Suspense } from "react";
import RecipeDetail from "../recipe-detail";
import Frame from "@/components/frame/frame";
import Loading, { LoadingSkeletonType } from "@/components/loading";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";

export default async function RecipeDetailPage({
  params,
  searchParams,
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
          <div className="lg:mr-96 text-xl font-serif">
            <Suspense
              fallback={<Loading type={LoadingSkeletonType.imageAndText} />}
            >
              <RecipeDetail
                recipeId={params.id}
                userRole={checkUser.userType}
              />
            </Suspense>
          </div>
        </div>
        <div className="hidden lg:block absolute top-0 right-0 px-4 mx-4 py-2">
          <p className="font-bold py-4">On this page</p>
          <div className="space-y-2">
            <p className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              <a href="#ingredients"> &gt; Ingredients</a>
            </p>
            <p className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              <a href="#tools"> &gt; Tools</a>
            </p>
            <p className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              <a href="#steps"> &gt; Steps</a>
            </p>
            <p className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              <a href="#tips"> &gt; Tips</a>
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
