import {FC} from "react";
import Link from "next/link";
import {RecipeHit} from "@/api/dto/input/recipe-search";

const RecipeItem: FC<RecipeHit> = ({_links, recipe}) => {
  const recipeID = _links.self.href.split(
    "https://api.edamam.com/api/recipes/v2/"
  );

  return (
    <Link
      href={`/details/${recipeID[1]}`}
      className="flex relative items-center justify-center flex-col h-auto w-auto group transition delay-150 lg:min-h-80 "
    >
      <img
        src={recipe.image}
        alt={recipe.label}
        className="rounded-md w-full hover:blur-sm duration-300 transition-all"
      />

      <div className="absolute w-full h-full bg-black opacity-20 hover:bg-secondary rounded-lg"></div>
      <h3 className="font-bold pt-3 lg:text-xl text-base px-2 absolute bottom-5 left-3 text-white transition ease-in-out group-hover:-translate-y-3">
        <Link href={`/details/${recipeID[1]}`}>{recipe.label}</Link>
      </h3>
    </Link>
  );
};

export default RecipeItem;
