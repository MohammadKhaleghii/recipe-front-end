import {RecipeSearch} from "@/api/dto/input/recipe-search";
import {RecipeSearchParams} from "@/api/dto/output/recipe-search-params";
import {getRecipeSearch} from "@/api/lib/recipes";
import RecipeButton from "@/components/common/button";
import RecipeInput from "@/components/common/input";
import RecipeItem from "@/components/recipe-item";
import RecipeItemSkeleton from "@/components/recipe-item/recipe-item-skeleton";
import PublicLayout from "@/layouts/public-layout";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";

export default function Home() {
  const router = useRouter();
  const [recipeSearchItems, setRecipeSearchItems] = useState<RecipeSearch>();
  const [searchedQuery, setSetSearchedQuery] = useState<string>("");
  const muckArrayForSkeleton = new Array(8).fill(0);
  useEffect(() => {
    const searchParams: RecipeSearchParams = {
      beta: false,
      diet: "balanced",
      imageSize: "LARGE",
      type: "public",
    };
    getRecipeSearch(searchParams)
      .then(({data}) => {
        const recipeItemsTenFirstItems = data.hits.slice(0, 12);
        const recipe: RecipeSearch = {
          ...data,
          hits: recipeItemsTenFirstItems,
        };
        setRecipeSearchItems(recipe);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <section className="bg-secondary lg:h-[450px] h-[350px] flex items-center justify-center">
        <div className="bg-white rounded-lg lg:w-1/2 md:w-[90%] w-full lg:mx-0 mx-2 h-1/2 p-4 flex flex-col justify-center ">
          <div className="text-gray-200 lg:text-3xl text-xl font-bold pb-3">
            Search For Recipe
          </div>
          <div className="flex lg:flex-row flex-col   items-center justify-between gap-x-3 gap-y-3">
            <RecipeInput
              onChange={(event) => setSetSearchedQuery(event.target.value)}
              width="w-full"
              placeholder="Enter your title"
            />
            <RecipeButton
              onClick={() => router.push(`/search?q=${searchedQuery}`)}
              UIType="primary"
              width="w-full lg:w-fit"
              mainText="Find Recipe"
            />
          </div>
        </div>
      </section>
      <section className="py-10 px-4 mx-auto w-full max-w-screen-xl ">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 items-center lg:justify-between  w-full">
          {recipeSearchItems &&
            recipeSearchItems.hits.map(({recipe, _links}) => (
              <RecipeItem key={recipe.label} _links={_links} recipe={recipe} />
            ))}
          {!recipeSearchItems &&
            muckArrayForSkeleton.map((item, index) => (
              <RecipeItemSkeleton key={index} />
            ))}
        </div>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
