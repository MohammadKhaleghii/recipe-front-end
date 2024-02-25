import React from "react";
import Skeleton from "react-loading-skeleton";

type RecipeCardSkeletonProps = {};

const RecipeCardSkeleton = (_: RecipeCardSkeletonProps) => {
  return (
    <div className="flex w-full flex-row gap-x-3">
      <div className="w-[55%] ">
        {" "}
        <Skeleton height={100} />{" "}
      </div>
      <div className="w-full">
        <Skeleton count={3} />{" "}
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
