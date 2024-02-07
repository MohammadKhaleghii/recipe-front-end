import { FC } from "react";
import Link from "next/link";
import { RecipeHit } from "@/api/dto/input/recipe-search";
import Skeleton from "react-loading-skeleton";

const RecipeItemSkeleton = () => {
  return (
    <Skeleton className="flex h-40 w-auto flex-col items-center justify-center lg:h-80"></Skeleton>
  );
};

export default RecipeItemSkeleton;
