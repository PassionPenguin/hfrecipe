import DateTime from "@/components/ui/date";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { UserRole } from "../user/usermodel";

export default async function IngredientDetail({
    ingredientId,
    userRole
}: Readonly<{
    ingredientId: string;
    userRole: UserRole;
}>) {
    const ingredient = await prisma.ingredient.findUnique({
        where: {
            publicId: String(ingredientId)
        }
    });
    let titleSection = (
        <>
            <div className="pb-8">
                <h1 className="py-4 font-serif text-5xl font-bold">
                    {ingredient.title}
                </h1>
                <p className="my-2 border-l-4 border-gray-500 py-2 pl-4 text-xl text-gray-600 dark:text-gray-400">
                    {ingredient.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    First published <DateTime date={ingredient.createdAt} />,
                    Last modified <DateTime date={ingredient.updatedAt} />
                </p>
            </div>
        </>
    );

    let editorialButtons = <></>;
    if (userRole === UserRole.Admin || userRole === UserRole.SuperAdmin) {
        editorialButtons = (
            <div className="pt-16">
                <Link href={"/ingredient/edit/" + ingredient.publicId}>
                    <button className="rounded border-2 border-slate-900 px-4 py-2 text-slate-900 hover:text-slate-700 dark:border-slate-100 dark:text-slate-100 dark:hover:text-slate-300">
                        Edit
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {titleSection}
            <hr />
            {editorialButtons}
        </>
    );
}
