"use client";

import { UserRole } from "@/app/user/usermodel";
import UIButton, { ButtonType } from "@/components/ui/button";
import DateTime from "@/components/ui/date";
import Ingredient from "@/lib/models/ingredient";
import Link from "next/link";
import { useState } from "react";

enum SortBy {
    TITLE,
    DESCRIPTION,
    CREATED_AT,
    UPDATED_AT
}

enum SortOrder {
    ASC,
    DESC
}

export default function IngredientList({
    userType,
    ingredients
}: Readonly<{
    userType: UserRole;
    ingredients: Ingredient[];
}>) {
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.TITLE);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
    const [sortedIngredients, setSortedIngredients] =
        useState<Ingredient[]>(ingredients);
    const [keyword, setKeyword] = useState("");

    const sortByTitle = () =>
        setSortedIngredients(
            [...sortedIngredients].sort((a, b) =>
                a.title > b.title
                    ? sortOrder === SortOrder.ASC
                        ? 1
                        : -1
                    : sortOrder === SortOrder.ASC
                      ? -1
                      : 1
            )
        );

    const sortByDescription = () =>
        setSortedIngredients(
            [...sortedIngredients].sort((a, b) =>
                a.description > b.description
                    ? sortOrder === SortOrder.ASC
                        ? 1
                        : -1
                    : sortOrder === SortOrder.ASC
                      ? -1
                      : 1
            )
        );

    const sortByCreatedAt = () =>
        setSortedIngredients(
            [...sortedIngredients].sort((a, b) =>
                a.createdAt > b.createdAt
                    ? sortOrder === SortOrder.ASC
                        ? 1
                        : -1
                    : sortOrder === SortOrder.ASC
                      ? -1
                      : 1
            )
        );

    const sortByUpdatedAt = () =>
        setSortedIngredients(
            [...sortedIngredients].sort((a, b) =>
                a.updatedAt > b.updatedAt
                    ? sortOrder === SortOrder.ASC
                        ? 1
                        : -1
                    : sortOrder === SortOrder.ASC
                      ? -1
                      : 1
            )
        );

    const sortFunctionReflects = (_sortBy: SortBy) => {
        switch (_sortBy) {
            case SortBy.TITLE:
                sortByTitle();
                break;
            case SortBy.DESCRIPTION:
                sortByDescription();
                break;
            case SortBy.CREATED_AT:
                sortByCreatedAt();
                break;
            case SortBy.UPDATED_AT:
                sortByUpdatedAt();
                break;
        }
    };

    const sort = (_sortBy: SortBy) => {
        if (sortBy === _sortBy) {
            setSortOrder(
                sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
            );
        } else {
            setSortOrder(SortOrder.ASC);
            setSortBy(_sortBy);
        }
        sortFunctionReflects(_sortBy);
    };

    const search = (keyword: string) =>
        setSortedIngredients(
            [...ingredients].filter(
                (ingredient) =>
                    ingredient.title.includes(keyword) ||
                    ingredient.description.includes(keyword)
            )
        );

    return (
        <>
            <h1 className="text-4xl font-bold">All ingredients</h1>
            <div className="relative my-8 overflow-x-auto shadow-md sm:rounded-lg">
                <div className="bg-white pb-4 dark:bg-slate-800">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1">
                        <div className="rtl:inset-r-0 absolute inset-y-0 start-0 flex cursor-pointer items-center py-2 ps-3">
                            <a href="#" onClick={() => search(keyword)}>
                                <svg
                                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </a>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 py-2 ps-10 text-sm text-gray-900 outline-none ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            placeholder="Search for items"
                            value={keyword}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") search(keyword);
                            }}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 rtl:text-right dark:bg-gray-800 dark:text-white">
                        All ingredients
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Browse a list of ingredients with description.
                            <Link href="/ingredient/create">
                                <UIButton
                                    title="Create ingredient"
                                    buttonType={ButtonType.link}
                                />
                            </Link>
                        </p>
                    </caption>
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Name
                                    <a
                                        href="#"
                                        onClick={() => sort(SortBy.TITLE)}
                                    >
                                        <svg
                                            className="ms-1.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Description
                                    <a
                                        href="#"
                                        onClick={() => sort(SortBy.DESCRIPTION)}
                                    >
                                        <svg
                                            className="ms-1.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Created At
                                    <a
                                        href="#"
                                        onClick={() => sort(SortBy.CREATED_AT)}
                                    >
                                        <svg
                                            className="ms-1.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Updated At
                                    <a
                                        href="#"
                                        onClick={() => sort(SortBy.UPDATED_AT)}
                                    >
                                        <svg
                                            className="ms-1.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedIngredients.map((ingredient) => (
                            <tr
                                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                key={ingredient.publicId}
                            >
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {ingredient.title}
                                </th>
                                <td className="px-6 py-4">
                                    {ingredient.description}
                                </td>
                                <td className="px-6 py-4">
                                    <DateTime date={ingredient.createdAt} />
                                </td>
                                <td className="px-6 py-4">
                                    <DateTime date={ingredient.updatedAt} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/ingredient/${ingredient.publicId}`}
                                    >
                                        <UIButton
                                            title="View"
                                            buttonType={ButtonType.link}
                                        />
                                    </Link>
                                    {userType === UserRole.SuperAdmin ||
                                    userType === UserRole.Admin ? (
                                        <Link
                                            href={`/ingredient/edit/${ingredient.publicId}`}
                                        >
                                            <UIButton
                                                title="Edit"
                                                buttonType={ButtonType.link}
                                            />
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
