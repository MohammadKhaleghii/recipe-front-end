import {FC} from "react";
import {RecipeCardProps} from "./recipe-card.interface";
import {RecipeHit} from "@/api/dto/input/recipe-search";
import Link from "next/link";

const RecipeCard: FC<RecipeHit> = ({_links, recipe}) => {
  const recipeID = _links.self.href.split(
    "https://api.edamam.com/api/recipes/v2/"
  );
  return (
    <Link
      href={`/details/${recipeID[1]}`}
      className="flex flex-row items-start justify-start gap-x-2 group"
    >
      <img src={recipe.image} className="w-28 min-h-24 rounded-md " alt="" />
      <h5 className="text-base font-bold group-hover:text-primary">
        {recipe.label}
      </h5>
    </Link>
  );
};

export default RecipeCard;
