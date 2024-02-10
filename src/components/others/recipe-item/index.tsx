import { FC } from "react";
import Link from "next/link";
import { RecipeHit } from "@/api/dto/input/recipe-search";
import { useRouter } from "next/router";

//Description
// 1. This Component is a pure component
// 2. We use this component for recipe item such as recent post, search page and etc.

const RecipeItem: FC<RecipeHit> = ({ _links, recipe }) => {
  const router = useRouter();
  const recipeID = _links.self.href.split(
    "https://api.edamam.com/api/recipes/v2/",
  );
  const path = `/details/${recipeID[1]}`;

  return (
    <button
      onClick={() => router.push(path)}
      className="group relative flex h-auto min-h-32 w-auto flex-col items-center justify-center transition delay-150 lg:min-h-80"
    >
      <img
        src={recipe.image}
        alt={recipe.label}
        className="relative w-full rounded-md transition-all duration-300 hover:blur-sm"
      />

      <div className="absolute h-full w-full rounded-lg bg-black opacity-20 hover:bg-secondary"></div>
      <h3 className="absolute bottom-5 left-3 px-2 pt-3 text-base font-bold text-white transition ease-in-out group-hover:-translate-y-3 lg:text-xl">
        <Link href={path}>{recipe.label}</Link>
      </h3>
    </button>
  );
};

export default RecipeItem;
