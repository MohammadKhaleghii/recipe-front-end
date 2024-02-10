import { FC } from "react";
import { RecipeHit } from "@/api/dto/input/recipe-search";
import Link from "next/link";

// Description
// 1. This Component is a pure component
// 2. We use this component for recipe card such as related recipe and etc.

const RecipeCard: FC<RecipeHit> = ({ _links, recipe }) => {
  const recipeID = _links.self.href.split(
    "https://api.edamam.com/api/recipes/v2/",
  );
  return (
    <Link
      href={`/details/${recipeID[1]}`}
      className="group flex flex-row items-start justify-start gap-x-2"
    >
      <img src={recipe.image} className="min-h-24 w-28 rounded-md" alt="" />
      <h5 className="text-base font-bold group-hover:text-primary">
        {recipe.label}
      </h5>
    </Link>
  );
};

export default RecipeCard;
