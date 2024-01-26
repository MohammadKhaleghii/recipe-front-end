import {FC} from "react";
import Link from "next/link";
import {RecipeHit} from "@/api/dto/input/recipe-search";
import Skeleton from "react-loading-skeleton";

const RecipeItemSkeleton = () => {
  return (
    <Skeleton className="flex items-center justify-center flex-col w-auto h-80 "></Skeleton>
  );
};

export default RecipeItemSkeleton;
