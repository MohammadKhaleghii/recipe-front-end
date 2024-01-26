import {RecipeSearch} from "@/api/dto/input/recipe-search";
import {RecipeSearchParams} from "@/api/dto/output/recipe-search-params";
import {getRecipeSearch} from "@/api/lib/recipes";
import RecipeButton from "@/components/button";
import RecipeInput from "@/components/input";
import RecipeItem from "@/components/recipe-item";
import RecipeItemSkeleton from "@/components/recipe-item/recipe-item-skeleton";
import PublicLayout from "@/layouts/public-layout";
import {ReactElement, useEffect, useState} from "react";

const RecipeSearchPage = () => {
  const [recipeSearchItems, setRecipeSearchItems] = useState<RecipeSearch>();

  const muckArrayForSkeleton = new Array(9).fill(0);
  useEffect(() => {
    const searchParams: RecipeSearchParams = {
      app_id: "d29e7d29",
      app_key: "a5d799d39df62345f05f8d36489e5953",
      beta: false,
      diet: "balanced",
      imageSize: "LARGE",
      type: "any",
    };
    getRecipeSearch(searchParams)
      .then(({data}) => {
        const recipeItemsTenFirstItems = data.hits.slice(0, 41);
        const recipe: RecipeSearch = {
          ...data,
          hits: recipeItemsTenFirstItems,
        };
        setRecipeSearchItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const sidebarFilters = [
    {
      title: "Diet",
      children: [
        {
          title: "balanced",
          key: "balanced",
        },
        {
          title: "High Fiber",
          key: "high-fiber",
        },
        {
          title: "High Protein",
          key: "high-protein",
        },
        {
          title: "Low Carbohydrates",
          key: "low-carb",
        },
      ],
    },
    {
      title: "Health",
      children: [
        {
          title: "alcohol-cocktail",
          key: "alcohol-cocktail",
        },
        {
          title: "Alcohol Free",
          key: "alcohol-free",
        },
        {
          title: "Celery Free",
          key: "celery-free",
        },
        {
          title: "Crustacean Free",
          key: "crustacean-free",
        },
        {
          title: "Dairy Free",
          key: "dairy-free",
        },
      ],
    },
    {
      title: "Cuisine Type",
      children: [
        {
          title: "American",
          key: "American",
        },
        {
          title: "Asian",
          key: "Asian",
        },
        {
          title: "British",
          key: "British",
        },
        {
          title: "Caribbean",
          key: "Caribbean",
        },
        {
          title: "Central Europe",
          key: "Central Europe",
        },
      ],
    },
  ];
  return (
    <div className="mx-auto my-10 w-full max-w-screen-xl px-4 flex flex-row lg:justify-between justify-around gap-x-3">
      <section className="lg:w-1/4 lg:block hidden  h-full border border-gray-300  rounded-md p-2">
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <h3 className="text-lg font-bold">Filters</h3>
          <button className="text-xs text-primary font-bold hover:bg-secondary hover:text-white transition delay-100 p-2 rounded-lg">
            Remove
          </button>
        </div>
        <div className="py-5">
          <span className="pb-3 font-bold">search:</span>
          <div className="flex items-center justify-center gap-x-2">
            <RecipeInput
              placeholder="search by...."
              width="w-full"
              height="h-[40px]"
            />
            <div className="bg-primary rounded-md px-3 py-2">
              <i className=" fas fa-search text-white cursor-pointer"></i>
            </div>
          </div>

          <div>
            {sidebarFilters.map((sidebarItem) => (
              <div>
                <div className="pt-3 font-bold">{sidebarItem.title}</div>
                {sidebarItem.children.map((item) => (
                  <div className="flex items-center justify-start gap-x-2 cursor-pointer">
                    <div>
                      <i className="fa-regular fa-square text-xl "></i>
                    </div>
                    <div className="">{item.title}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="pt-5">
            <RecipeButton
              UIType="secondary"
              width="w-full"
              mainText="Apply Filters"
            />
          </div>
        </div>
      </section>
      <section className="lg:w-3/4 w-4/4">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 items-center lg:justify-between  w-full">
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
    </div>
  );
};

RecipeSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default RecipeSearchPage;
