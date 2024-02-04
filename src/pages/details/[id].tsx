import {RecipeDetailsInput} from "@/api/dto/input/recipe-details";
import {RecipeSearch} from "@/api/dto/input/recipe-search";
import {RecipeSearchParams} from "@/api/dto/output/recipe-search-params";
import {getRecipeDetails, getRecipeSearch} from "@/api/lib/recipes";
import RecipeCard from "@/components/recipe-card";
import RecipeItem from "@/components/recipe-item";
import RecipeItemSkeleton from "@/components/recipe-item/recipe-item-skeleton";
import PublicLayout from "@/layouts/public-layout";
import {RecipeBadge} from "@/styles/components/badge";
import {RecipeTitle} from "@/styles/components/title";
import Link from "next/link";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";
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
    query: {id},
  } = useRouter();
  const recipeID = id?.toString() ?? "";

  useEffect(() => {
    setRecipeDetailsLoading(true);
    const searchParams: RecipeSearchParams = {
      beta: false,
      diet: "balanced",
      imageSize: "LARGE",
      type: "public",
    };
    if (recipeID) {
      getRecipeDetails(recipeID, searchParams)
        .then(({data}) => {
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
      .then(({data}) => {
        const latestRecipeItems = data.hits.slice(
          data.hits.length - 4,
          data.hits.length
        );
        const latestRecipeItemsCopy: RecipeSearch = {
          ...data,
          hits: latestRecipeItems,
        };
        setLatestRecipe(latestRecipeItemsCopy);

        const relatedRecipe = data.hits.slice(
          data.hits.length - 4,
          data.hits.length
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
    <div className="px-4 mx-auto w-full max-w-screen-xl py-4">
      <div className="flex lg:flex-row flex-col gap-x-4">
        <section className="lg:w-3/4 w-4/4">
          <div className="px-2 py-5 flex lg:flex-row flex-col gap-x-4">
            {!recipeDetailsLoading ? (
              <img
                src={recipeDetails?.recipe.images.REGULAR.url}
                className="rounded-lg lg:my-4 min-w-64 "
                alt=""
              />
            ) : (
              <Skeleton className="min-w-64 min-h-64 h-full w-full" />
            )}

            <div className="flex flex-col gap-y-4 w-full">
              <h1 className="lg:text-3xl font-bold text-lg pt-2 ">
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
                      className="w-12 h-12 rounded-full inline-block mr-3"
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
          <div className="py-4 border border-gray-300 rounded-md p-2">
            <RecipeTitle>Ingredients</RecipeTitle>
            <div className="">
              {recipeDetails &&
                !recipeDetailsLoading &&
                recipeDetails.recipe.ingredients.map((ingredient) => (
                  <div className="mb-3 flex gap-x-4  ">
                    <img
                      className="lg:w-40 lg:h-40 w-28 h-28 rounded-lg"
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
                ingredientsSkeletonArray.map(() => (
                  <div
                    className="w-full flex 
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
          <div className="py-4 border border-gray-300 rounded-md p-2 my-4">
            <RecipeTitle>Health Labels</RecipeTitle>

            <div className="flex gap-x-4 gap-y-2 flex-row flex-wrap">
              {recipeDetails &&
                !recipeDetailsLoading &&
                recipeDetails.recipe.healthLabels.map((label) => (
                  <RecipeBadge>{label}</RecipeBadge>
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
        <section className="lg:w-1/4 hidden lg:block  ">
          <div className="border border-gray-300 rounded-md p-2">
            <RecipeTitle>Related Recipe</RecipeTitle>
            <div className="flex flex-col gap-y-4 ">
              {relatedRecipe &&
                !relatedRecipeLoading &&
                relatedRecipe.hits.map(({recipe, _links}) => (
                  <RecipeCard
                    key={recipe.label}
                    _links={_links}
                    recipe={recipe}
                  />
                ))}
              {recipeDetailsLoading &&
                relatedRecipeSkeletonArray.map((item, index) => (
                  <div className="flex flex-row gap-x-3 w-full">
                    <div className="w-[55%] ">
                      {" "}
                      <Skeleton height={100} />{" "}
                    </div>
                    <div className="w-full">
                      <Skeleton count={3} />{" "}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <section className="py-10 mx-auto w-full max-w-screen-xl ">
        <RecipeTitle>Latest Recipe</RecipeTitle>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 items-center lg:justify-between  w-full">
          {latestRecipe &&
            !relatedRecipeLoading &&
            latestRecipe.hits.map(({recipe, _links}) => (
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
