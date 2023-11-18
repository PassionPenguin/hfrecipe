import Link from "next/link";
import nanoid from "../../../lib/nanoid";
import Dropdown from "../../../components/dropdown";
import prisma from "../../../lib/prisma";
import React from "react";
import { protectRoutes } from "@/lib/protectRoutes";
import Frame from "@/components/frame/frame";

export default async function RecipeCreatePage({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  let body: React.ReactElement,
    checkUser = protectRoutes();
  if (!checkUser.status) {
    body = <>NO PERMISSION</>;
  } else {
    let cuisineTypes = await prisma.cuisineType.findMany();
    const publicId = nanoid({});
    body = (
      <div>
        <form action="/api/recipe/create" method="POST">
          <h1 className="font-bold text-3xl py-4">New Recipe</h1>
          <input type="hidden" name="publicId" value={publicId} readOnly />
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 "
            >
              Title
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="title"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900"
                placeholder="title"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 "
            >
              Description
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="description"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900"
                placeholder="description"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="servingsMultiplier"
              className="block text-sm font-medium leading-6 "
            >
              Servings Multiplier
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="servingsMultiplier"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900"
                placeholder="1.0"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="steps"
              className="block text-sm font-medium leading-6 "
            >
              Steps
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <textarea
                name="steps"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900"
                placeholder="Steps"
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
              />
            </div>
          </div>
          <Dropdown
            _selected={cuisineTypes[0]}
            all={cuisineTypes}
            name="cuisineTypeId"
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Or{" "}
          <Link
            href="/"
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
