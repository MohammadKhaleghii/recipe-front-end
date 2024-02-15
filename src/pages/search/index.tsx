import { RecipeSearch } from "@/api/dto/input/recipe-search";
import { RecipeSearchParams } from "@/api/dto/output/recipe-search-params";
import { getRecipeSearch } from "@/api/lib/recipes";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import RecipeItem from "@/components//others/recipe-item";
import RecipeItemSkeleton from "@/components/others/recipe-item/recipe-item-skeleton";
import { MenuContext } from "@/contexts/menu-provider";
import PublicLayout from "@/layouts/public-layout";
import { Global, css } from "@emotion/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import {
  ReactElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import sidebarFilters from "./constants.json";
import { NextSeo } from "next-seo";
import { GetServerSidePropsContext } from "next";

const RecipeSearchPage = ({
  recipeSearchItems,
}: {
  recipeSearchItems: RecipeSearch;
}) => {
  console.log(recipeSearchItems);
  const router = useRouter();
  const muckArrayForSkeleton = new Array(9).fill(0);

  const [loading, setLoading] = useState<boolean>(true);
  const { isMobileFilterMenuOpen, setIsMobileFilterMenuOpen } =
    useContext(MenuContext);
  let [selectedDietFilter, setSelectedDietFilter] = useState<string[]>([]);
  let [selectedHealthFilter, setSelectedHealthFilter] = useState<string[]>([]);
  let [selectedCuisineTypeFilter, setSelectedCuisineTypeFilter] = useState<
    string[]
  >([]);

  const [searchedQuery, setSearchedQuery] = useState(
    router.query.q?.toString() ?? "",
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    const cuisineTypeParam =
      router.query.cuisineType &&
      router.query.cuisineType?.toString().split(",");
    const healthParam =
      router.query.health && router.query.health?.toString().split(",");
    const dietParam =
      router.query.diet && router.query.diet?.toString().split(",");
    if (cuisineTypeParam) {
      setSelectedCuisineTypeFilter(cuisineTypeParam);
    }
    if (healthParam) {
      setSelectedHealthFilter(healthParam);
    }
    if (dietParam) {
      setSelectedDietFilter(dietParam);
    }
  }, [router.query]);

  const handleSearchFilters = (parentKey: number, key: string) => {
    switch (parentKey) {
      case 1:
        const findDietEl = selectedDietFilter.find((item) => item === key);
        if (findDietEl) {
          const newDietArray = selectedDietFilter.filter(
            (item) => item !== key,
          );
          setSelectedDietFilter(newDietArray);
          break;
        }
        setSelectedDietFilter([...selectedDietFilter, key]);
        break;
      case 2:
        const findHealthEl = selectedHealthFilter.find((item) => item === key);
        if (findHealthEl) {
          const newHealthArray = selectedHealthFilter.filter(
            (item) => item !== key,
          );
          setSelectedHealthFilter(newHealthArray);
          break;
        }
        setSelectedHealthFilter([...selectedHealthFilter, key]);
        break;
      case 3:
        const findCuisineType = selectedCuisineTypeFilter.find(
          (item) => item === key,
        );
        if (findCuisineType) {
          const newCuisineTypeArray = selectedCuisineTypeFilter.filter(
            (item) => item !== key,
          );
          setSelectedCuisineTypeFilter(newCuisineTypeArray);
          break;
        }

        setSelectedCuisineTypeFilter([...selectedCuisineTypeFilter, key]);
        break;
    }
  };
  const handleUpdateChecklistIcon = (parentKey: number, key: string) => {
    switch (parentKey) {
      case 1:
        const findDietEl = selectedDietFilter.find((item) => item === key);
        if (findDietEl) {
          return false;
        }
        return true;
      case 2:
        const findHealthEl = selectedHealthFilter.find((item) => item === key);
        if (findHealthEl) {
          return false;
        }
        return true;

      case 3:
        const findCuisineType = selectedCuisineTypeFilter.find(
          (item) => item === key,
        );
        if (findCuisineType) {
          return false;
        }

        return true;
    }
  };

  const handleApplyFilter = () => {
    setIsMobileFilterMenuOpen(false);
    router.push({
      query: {
        q: searchedQuery,
        diet: selectedDietFilter.toString(),
        health: selectedHealthFilter.toString(),
        cuisineType: selectedCuisineTypeFilter.toString(),
      },
    });
  };

  const currentPagePath = `/search`;
  const filter = (
    <>
      {" "}
      <div className="flex items-center justify-between border-b border-gray-100 pb-1">
        <h3 className="text-lg font-bold">Filters</h3>
        <Button
          onClick={() => router.push(currentPagePath)}
          variant={"tertiary"}
        >
          Remove
        </Button>
      </div>
      <div className="py-5">
        <span className="pb-3 font-bold">search:</span>
        <div className="flex items-center justify-center gap-x-2">
          <Input
            variants="primary"
            defaultValue={router.query.q?.toString() ?? ""}
            onChange={(event) => setSearchedQuery(event.target.value)}
            placeholder="search by...."
            value={searchedQuery}
          />
        </div>
        <div>
          {sidebarFilters.map((sidebarItem) => (
            <div key={sidebarItem.key}>
              <div className="pt-3 font-bold">{sidebarItem.title}</div>
              {sidebarItem.children.map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleSearchFilters(sidebarItem.key, item.key)}
                  className="flex cursor-pointer items-center justify-start gap-x-2"
                >
                  <div>
                    <i
                      className={`fa-regular  ${
                        handleUpdateChecklistIcon(sidebarItem.key, item.key)
                          ? "fa-square"
                          : "fa-square-check"
                      } text-xl`}
                    ></i>
                  </div>
                  <div className="">{item.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pt-5">
          <Button
            variant="primary"
            onClick={() => handleApplyFilter()}
            className="w-full"
          >
            {" "}
            Apply Filters
          </Button>
        </div>
        <div className="block pt-5 lg:hidden lg:pt-0 ">
          <Button
            variant="secondary"
            onClick={() => setIsMobileFilterMenuOpen(false)}
            className="w-full"
          >
            {" "}
            Close
          </Button>
        </div>
      </div>
    </>
  );

  const updateBodyStyle = () => {
    if (isMobileFilterMenuOpen) {
      return css`
        body {
          overflow: hidden;
        }
      `;
    }
  };

  const searchPageURl = `https://recipe-front-end-coral.vercel.app/search`;
  const seoTitle = "Food recipe search page";
  const metaDescription =
    "find your favorite recipe in a minute in our website - Food Recipe ";
  return (
    <>
      <NextSeo
        title={seoTitle}
        noindex={Object.keys(router.query).length > 0}
        nofollow={Object.keys(router.query).length > 0}
        description={metaDescription}
        canonical={searchPageURl}
        openGraph={{
          title: seoTitle,
          description: metaDescription,
          siteName: "Food Recipe",
          url: searchPageURl,
        }}
      />
      <div className="mx-auto my-10 flex w-full max-w-screen-xl flex-row justify-around gap-x-3 px-4 lg:justify-between">
        <Global styles={updateBodyStyle()} />
        <section className="hidden h-full rounded-md  border border-gray-300 p-2  lg:block lg:w-1/4">
          {filter}
        </section>
        <section className="w-full lg:w-3/4">
          <div
            onClick={() => setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen)}
            className=" flex flex-row  items-center gap-x-2  lg:hidden"
          >
            <i className="fa-regular fa-filter text-lg"></i>
            <button className="my-4 text-xl font-bold">Filters</button>
          </div>
          {recipeSearchItems.hits.length === 0 && (
            <div className="text-center text-xl font-bold text-red-500">
              No data found
              <br />
              Please change your filter
            </div>
          )}
          <div className="grid w-full grid-cols-2 items-center gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-3  lg:justify-between">
            {!loading &&
              recipeSearchItems &&
              recipeSearchItems.hits.map(({ recipe, _links }) => (
                <RecipeItem
                  key={recipe.label}
                  _links={_links}
                  recipe={recipe}
                />
              ))}

            {loading &&
              muckArrayForSkeleton.map((item, index) => (
                <RecipeItemSkeleton key={index} />
              ))}
          </div>
        </section>
        {isMobileFilterMenuOpen && (
          <section className="fixed bottom-0 z-50 h-full w-full overflow-y-scroll rounded-e-md bg-white p-4">
            {filter}
          </section>
        )}
      </div>
    </>
  );
};

RecipeSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default RecipeSearchPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let recipeSearchItems: RecipeSearch | null = null;
  const searchParams: RecipeSearchParams = {
    beta: false,
    imageSize: "LARGE",
    type: "any",
    q: context.query.q?.toString() ?? "",
  };
  const cuisineTypeParam =
    context.query.cuisineType &&
    context.query.cuisineType?.toString().split(",");
  const healthParam =
    context.query.health && context.query.health?.toString().split(",");
  const dietParam =
    context.query.diet && context.query.diet?.toString().split(",");
  if (cuisineTypeParam) {
    searchParams.cuisineType = cuisineTypeParam;
  }
  if (healthParam) {
    searchParams.health = healthParam;
  }
  if (dietParam) {
    searchParams.diet = dietParam;
  }
  await getRecipeSearch(searchParams)
    .then(({ data }) => {
      recipeSearchItems = data;
    })
    .catch((error) => {
      console.error(error);
      toast.error("Server error! please refresh this page");
    });
  return {
    props: {
      recipeSearchItems,
    },
  };
};
