import ReactMarkdown from "react-markdown";
import Recipe from "@/lib/models/recipe";
import Link from "next/link";
import ExtendedImage from "@/components/extended-image/extended-image";
import { UserRole } from "../user/usermodel";

export default function RecipeDetail({
  recipe,
  userRole,
}: Readonly<{
  recipe: Recipe;
  userRole: UserRole;
}>) {
  let editorialButtons = <></>;
  if (userRole === UserRole.Admin || userRole === UserRole.SuperAdmin) {
    editorialButtons = (
      <>
        <Link href={"/recipe/edit/" + recipe.publicId}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit
          </button>
        </Link>
      </>
    );
  }
  return (
    <>
      <h1 className="font-serif text-5xl font-bold py-4">{recipe.title}</h1>
      <p className="border-l-4 text-xl border-gray-500 pl-4 text-gray-600 dark:text-gray-400 py-2 my-2">
        {recipe.description}
      </p>
      <h2 className="text-3xl font-bold py-4" id="step">
        Steps
      </h2>
      <ReactMarkdown
        className="py-4 space-y-4 list-decimal"
        components={{
          img(props) {
            return (
              <>
                <ExtendedImage
                  src={props.src}
                  alt={props.alt}
                  className="py-2 rounded-lg lg:max-w-[600px] md:max-w-[480px] sm:max-w-[360px] mx-auto"
                />
                <span className="text-center text-sm text-gray-600 dark:text-gray-400 block">
                  {props.alt}
                </span>
              </>
            );
          },
          ol(props) {
            return (
              <ol className="list-decimal list-inside" start={props.start}>
                {props.children}
              </ol>
            );
          },
          ul(props) {
            return <ul className="list-disc list-inside">{props.children}</ul>;
          },
        }}
      >
        {recipe.steps}
      </ReactMarkdown>
      <hr />
      <h2 className="text-3xl font-bold py-4" id="tips">
        Tips
      </h2>
      <ReactMarkdown
        className="py-4 space-y-4 list-decimal"
        components={{
          ol(props) {
            return (
              <ol className="list-decimal list-inside" start={props.start}>
                {props.children}
              </ol>
            );
          },
          ul(props) {
            return <ul className="list-disc list-inside">{props.children}</ul>;
          },
        }}
      >
        {recipe.tips}
      </ReactMarkdown>
      {editorialButtons}
    </>
  );
}
