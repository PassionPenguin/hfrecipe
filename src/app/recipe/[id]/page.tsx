import prisma from "@/lib/prisma";
import React from "react";
import RecipeDetail from "../recipe-detail";
import { protectRoutes } from "@/lib/protectRoutes";
import Frame from "@/components/frame/frame";

export default async function RecipeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let body: React.ReactElement,
    checkUser = protectRoutes();
  if (!checkUser.status) {
    body = <>NO PERMISSION</>;
  } else {
    const recipe = await prisma.recipe.findUnique({
      where: {
        publicId: String(params?.id),
      },
      include: {
        cuisineType: true,
      },
    });

    body = (
      <>
        <div className="">
          <div className="lg:mr-96 text-xl font-serif">
            <RecipeDetail recipe={recipe} userRole={checkUser.userType} />
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
