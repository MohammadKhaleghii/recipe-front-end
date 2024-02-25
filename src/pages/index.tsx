import { RecipeSearch } from "@/api/dto/input/recipe-search";
import { RecipeSearchParams } from "@/api/dto/output/recipe-search-params";
import { getRecipeSearch } from "@/api/lib/recipes";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import RecipeItem from "@/components//others/recipe-item";
import RecipeItemSkeleton from "@/components/others/recipe-item/recipe-item-skeleton";
import PublicLayout from "@/layouts/public-layout";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextSeo } from "next-seo";

export default function Home({ recipe }: { recipe: RecipeSearch | null }) {
  const router = useRouter();
  const searchPageURl = `https://recipe-front-end-coral.vercel.app/`;
  const seoTitle = "Food recipe";
  const metaDescription =
    "find your favorite recipe in a minute in our website - Food Recipe ";

  const [searchedQuery, setSetSearchedQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const muckArrayForSkeleton = new Array(8).fill(0);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={metaDescription}
        canonical={searchPageURl}
        openGraph={{
          title: seoTitle,
          description: metaDescription,
          siteName: "Food Recipe",
          url: searchPageURl,
        }}
      />
      <section className="flex h-[350px] items-center justify-center bg-secondary lg:h-[450px]">
        <div className="mx-2 flex h-1/2 w-full flex-col justify-center rounded-lg bg-white p-4 md:w-[90%] lg:mx-0 lg:w-1/2 ">
          <div className="pb-3 text-xl font-bold text-gray-200 lg:text-3xl">
            Search For Recipe
          </div>
          <div className="flex flex-col items-center   justify-between gap-x-3 gap-y-3 lg:flex-row">
            <Input
              variants="primary"
              className="w-full"
              value={searchedQuery}
              onChange={(event) => setSetSearchedQuery(event.target.value)}
              width="w-full"
              placeholder="Enter your title"
            />
            <Button
              onClick={() => router.push(`/search?q=${searchedQuery}`)}
              className="w-fit"
              variant="primary"
            >
              {" "}
              Apply Filters
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-screen-xl px-4 py-10 ">
        <div className="grid w-full grid-cols-2 items-center gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4  lg:justify-between">
          {recipe ? (
            recipe.hits.map(({ recipe, _links }) => (
              <RecipeItem key={recipe.label} _links={_links} recipe={recipe} />
            ))
          ) : (
            <div className="py-10 text-center text-2xl text-red-500 ">
              Server Error
            </div>
          )}
          {loading &&
            muckArrayForSkeleton.map((_, index) => (
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

export const getServerSideProps = async () => {
  const searchParams: RecipeSearchParams = {
    beta: false,
    imageSize: "LARGE",
    type: "public",
  };
  let recipes: RecipeSearch | null = null;
  await getRecipeSearch(searchParams)
    .then(({ data }) => {
      const recipeItemsTenFirstItems = data.hits.slice(0, 30);
      recipes = {
        ...data,
        hits: recipeItemsTenFirstItems,
      };
    })
    .catch((error) => {
      console.error(error);
    });
  return {
    props: {
      recipe: recipes,
    },
  };
};
