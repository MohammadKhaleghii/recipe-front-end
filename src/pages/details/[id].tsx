import { RecipeDetailsInput } from "@/api/dto/input/recipe-details";
import { RecipeSearch } from "@/api/dto/input/recipe-search";
import { RecipeSearchParams } from "@/api/dto/output/recipe-search-params";
import { getRecipeDetails, getRecipeSearch } from "@/api/lib/recipes";
import RecipeCard from "@/components/recipe-card";
import RecipeCardSkeleton from "@/components/recipe-card/recipe-card-skeleton";
import RecipeItem from "@/components/recipe-item";
import RecipeItemSkeleton from "@/components/recipe-item/recipe-item-skeleton";
import PublicLayout from "@/layouts/public-layout";
import { RecipeBadge } from "@/styles/components/badge";
import { RecipeTitle } from "@/styles/components/title";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const RecipeDetails = () => {
  const [recipeDetailsLoading, setRecipeDetailsLoading] =
    useState<boolean>(true);
  const [relatedRecipeLoading, setRelatedRecipeLoading] =
    useState<boolean>(true);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsInput>();
  const [relatedRecipe, setRelatedRecipe] = useState<RecipeSearch>();
  const [latestRecipe, setLatestRecipe] = useState<RecipeSearch>();
  const ingredientsSkeletonArray = new Array(3).fill(0);
  const relatedRecipeSkeletonArray = new Array(4).fill(0);
  const latestRecipeSkeletonArray = new Array(4).fill(0);

  const {
    query: { id },
  } = useRouter();
  const recipeID = id?.toString() ?? "";

  useEffect(() => {
    setRecipeDetailsLoading(true);
    const searchParams: RecipeSearchParams = {
      beta: false,
      imageSize: "LARGE",
      type: "public",
    };
    if (recipeID) {
      getRecipeDetails(recipeID, searchParams)
        .then(({ data }) => {
          setRecipeDetails(data);
          setRecipeDetailsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setRecipeDetailsLoading(false);
        });
    }
    setRelatedRecipeLoading(true);
    getRecipeSearch(searchParams)
      .then(({ data }) => {
        const latestRecipeItems = data.hits.slice(
          data.hits.length - 4,
          data.hits.length,
        );
        const latestRecipeItemsCopy: RecipeSearch = {
          ...data,
          hits: latestRecipeItems,
        };
        setLatestRecipe(latestRecipeItemsCopy);

        const relatedRecipe = data.hits.slice(
          data.hits.length - 4,
          data.hits.length,
        );
        const relatedRecipeCopy: RecipeSearch = {
          ...data,
          hits: relatedRecipe,
        };
        setRelatedRecipe(relatedRecipeCopy);
        setRelatedRecipeLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setRelatedRecipeLoading(false);
      });
  }, [recipeID]);
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 py-4">
      <div className="flex flex-col gap-x-4 lg:flex-row">
        <section className="w-4/4 lg:w-3/4">
          <div className="flex flex-col gap-x-4 px-2 py-5 lg:flex-row">
            {!recipeDetailsLoading ? (
              <img
                src={recipeDetails?.recipe.images.REGULAR.url}
                className="min-w-64 rounded-lg lg:my-4 "
                alt=""
              />
            ) : (
              <Skeleton className="h-full min-h-64 w-full min-w-64" />
            )}

            <div className="flex w-full flex-col gap-y-4">
              <h1 className="pt-2 text-lg font-bold lg:text-3xl ">
                {!recipeDetailsLoading ? (
                  recipeDetails?.recipe.label
                ) : (
                  <Skeleton count={1} />
                )}
              </h1>
              {!recipeDetailsLoading ? (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero nemo quod, architecto recusandae eligendi temporibus
                  iste mollitia illo error aliquid, dolorem consectetur rem?
                  Temporibus sed est rerum, molestias minima quis.
                </p>
              ) : (
                <Skeleton count={4} />
              )}
              {!recipeDetailsLoading ? (
                <div className="flex gap-x-5">
                  <RecipeBadge>
                    <i className="fa-regular fa-comments pr-1"> </i>{" "}
                    <span className="text-sm">20</span>
                  </RecipeBadge>
                  <RecipeBadge>
                    <i className="fa-regular fa-regular fa-share-nodes pr-1"></i>
                    <span className="text-sm">100</span>
                  </RecipeBadge>
                  <RecipeBadge>
                    <i className="fa-regular fa-heart pr-1"></i>
                    <span className="text-sm">20</span>
                  </RecipeBadge>
                </div>
              ) : (
                <Skeleton count={2} />
              )}
              <div>
                {!recipeDetailsLoading ? (
                  <>
                    <img
                      className="mr-3 inline-block h-12 w-12 rounded-full"
                      src="/assets/images/author.jpeg"
                      alt=""
                    />
                    <Link href="https://anothermohammad.ir/">
                      {" "}
                      <span className="font-bold">By Mohammad Khaleghi</span>
                    </Link>
                  </>
                ) : (
                  <Skeleton count={2} />
                )}
              </div>
            </div>
          </div>
          <div className="rounded-md border border-gray-300 p-2 py-4">
            <RecipeTitle>Ingredients</RecipeTitle>
            <div className="">
              {recipeDetails &&
                !recipeDetailsLoading &&
                recipeDetails.recipe.ingredients.map((ingredient) => (
                  <div key={ingredient.foodId} className="mb-3 flex gap-x-4  ">
                    <img
                      className="h-28 w-28 rounded-lg lg:h-40 lg:w-40"
                      src={ingredient.image}
                      alt=""
                    />
                    <div>
                      <h4 className="text-lg font-bold">{ingredient.text}</h4>
                      <ul className="pt-2">
                        <li className=" text-base">
                          quantity :{" "}
                          <span className="pl-2">{ingredient.quantity}</span>
                        </li>
                        <li className=" text-base">
                          measure :{" "}
                          <span className="pl-2">{ingredient.measure}</span>
                        </li>
                        <li className=" text-base">
                          weight{" "}
                          <span className="pl-2">
                            {ingredient.weight.toFixed(2)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              {recipeDetailsLoading &&
                ingredientsSkeletonArray.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full 
                 gap-x-4 "
                  >
                    <div>
                      <Skeleton
                        width={160}
                        height={160}
                        className=" rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton className="w-full" count={6} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="my-4 rounded-md border border-gray-300 p-2 py-4">
            <RecipeTitle>Health Labels</RecipeTitle>

            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              {recipeDetails &&
                !recipeDetailsLoading &&
                recipeDetails.recipe.healthLabels.map((label) => (
                  <RecipeBadge key={label}>{label}</RecipeBadge>
                ))}
              {recipeDetailsLoading && (
                <div className="w-full">
                  {" "}
                  <Skeleton count={4} />
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="hidden lg:block lg:w-1/4  ">
          <div className="rounded-md border border-gray-300 p-2">
            <RecipeTitle>Related Recipe</RecipeTitle>
            <div className="flex flex-col gap-y-4 ">
              {relatedRecipe &&
                !relatedRecipeLoading &&
                relatedRecipe.hits.map(({ recipe, _links }) => (
                  <RecipeCard
                    key={recipe.label}
                    _links={_links}
                    recipe={recipe}
                  />
                ))}
              {recipeDetailsLoading &&
                relatedRecipeSkeletonArray.map((item, index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
            </div>
          </div>
        </section>
      </div>
      <section className="mx-auto w-full max-w-screen-xl py-10 ">
        <RecipeTitle>Latest Recipe</RecipeTitle>

        <div className="grid w-full grid-cols-2 items-center gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4  lg:justify-between">
          {latestRecipe &&
            !relatedRecipeLoading &&
            latestRecipe.hits.map(({ recipe, _links }) => (
              <RecipeItem key={recipe.label} _links={_links} recipe={recipe} />
            ))}
          {recipeDetailsLoading &&
            latestRecipeSkeletonArray.map((item, index) => (
              <RecipeItemSkeleton key={index} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;

RecipeDetails.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
