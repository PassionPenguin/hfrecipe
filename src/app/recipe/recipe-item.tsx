import LazyExtendedImage from "@/components/ui/extended-image";
import Recipe from "@/lib/models/recipe";
import Link from "next/link";

export function RecipeItem({ recipe }: Readonly<{ recipe: Recipe }>) {
    return (
        <div className="py-4">
            <Link href={`/recipe/${recipe.publicId}`}>
                <p className="py-2 text-3xl font-bold">{recipe.title}</p>
            </Link>
            <p className="">{recipe.description}</p>
            <p className="text-xs">
                {recipe.cuisineType.title} | {recipe.estimatedTime}
            </p>
        </div>
    );
}

export function RecipeCard({ recipe }: Readonly<{ recipe: Recipe }>) {
    let img = <></>;
    if (recipe.odCover !== null) {
        img = (
            <LazyExtendedImage
                src={recipe.odCover}
                alt="Cover"
                className="rounded-t-lg"
            />
        );
    }
    return (
        <div className="mx-2 inline-block w-[300px] shrink-0 rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <Link href={`/recipe/${recipe.publicId}`}>{img}</Link>
            <div className="p-5">
                <Link href={`/recipe/${recipe.publicId}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {recipe.title}
                    </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {recipe.description}
                </p>
                <Link
                    href={`/recipe/${recipe.publicId}`}
                    className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Read more
                    <svg
                        className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
