import Link from "next/link";
import Dropdown from "@/components/dropdown";
import prisma from "@/lib/prisma";
import Frame from "@/components/frame/frame";
import React from "react";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";

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
        where: { publicId: params.id },
        include: { cuisineType: true },
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
          <input
            type="hidden"
            name="publicId"
            value={recipe.publicId}
            readOnly
          />
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6"
            >
              Title
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="title"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900"
                placeholder="title"
                defaultValue={recipe.title}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6"
            >
              Description
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="description"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:bg-slate-900"
                placeholder="description"
                defaultValue={recipe.description}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="servingsMultiplier"
              className="block text-sm font-medium leading-6"
            >
              Servings Multiplier
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="servingsMultiplier"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:bg-slate-900"
                placeholder="1.0"
                defaultValue={recipe.servingsMultiplier}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="steps"
              className="block text-sm font-medium leading-6"
            >
              Steps
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <textarea
                name="steps"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900 h-96"
                placeholder="Steps"
                defaultValue={recipe.steps}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="tips"
              className="block text-sm font-medium leading-6"
            >
              Tips
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <textarea
                name="tips"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900 h-96"
                placeholder="Tips"
                defaultValue={recipe.tips}
              />
            </div>
          </div>
          <Dropdown
            _selected={recipe.cuisineType}
            all={cuisineTypes}
            name="cuisineTypeId"
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
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
