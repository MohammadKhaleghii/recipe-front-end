import { RecipeSearch } from "@/api/dto/input/recipe-search";
import { RecipeSearchParams } from "@/api/dto/output/recipe-search-params";
import { getRecipeSearch } from "@/api/lib/recipes";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import RecipeItem from "@/components/recipe-item";
import RecipeItemSkeleton from "@/components/recipe-item/recipe-item-skeleton";
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

const RecipeSearchPage = () => {
  const router = useRouter();
  const muckArrayForSkeleton = new Array(9).fill(0);

  const searchParams: RecipeSearchParams = {
    beta: false,
    imageSize: "LARGE",
    type: "any",
    q: router.query.q?.toString() ?? "",
  };

  const [loading, setLoading] = useState<boolean>(true);
  const { isMobileFilterMenuOpen, setIsMobileFilterMenuOpen } =
    useContext(MenuContext);
  let [selectedDietFilter, setSelectedDietFilter] = useState<string[]>([]);
  let [selectedHealthFilter, setSelectedHealthFilter] = useState<string[]>([]);
  let [selectedCuisineTypeFilter, setSelectedCuisineTypeFilter] = useState<
    string[]
  >([]);

  const [recipeSearchItems, setRecipeSearchItems] = useState<RecipeSearch>();
  const [searchedQuery, setSearchedQuery] = useState(
    router.query.q?.toString() ?? "",
  );

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
      searchParams.cuisineType = cuisineTypeParam;
    }
    if (healthParam) {
      setSelectedHealthFilter(healthParam);
      searchParams.health = healthParam;
    }
    if (dietParam) {
      setSelectedDietFilter(dietParam);
      searchParams.diet = dietParam;
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query) {
      setLoading(true);
      getRecipeSearch(searchParams)
        .then(({ data }) => {
          setRecipeSearchItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Server error! please refresh this page");
        });
    }
  }, [router.query]);
  const sidebarFilters = [
    {
      title: "Diet",
      key: 1,
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
      key: 2,
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
      key: 3,
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

  const filter = (
    <>
      {" "}
      <div className="flex items-center justify-between border-b border-gray-100 pb-1">
        <h3 className="text-lg font-bold">Filters</h3>
        <button className="rounded-lg p-2 text-xs font-bold text-primary transition delay-100 hover:bg-secondary hover:text-white">
          Remove
        </button>
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
          <button
            onClick={() =>
              router.push({
                query: {
                  q: searchedQuery,
                },
              })
            }
            className="rounded-md bg-primary px-3 py-2"
          >
            <i className=" fas fa-search cursor-pointer text-white"></i>
          </button>
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

  return (
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
        <div className="grid w-full grid-cols-2 items-center gap-x-2 gap-y-4 md:grid-cols-3 lg:grid-cols-3  lg:justify-between">
          {!loading &&
            recipeSearchItems &&
            recipeSearchItems.hits.map(({ recipe, _links }) => (
              <RecipeItem key={recipe.label} _links={_links} recipe={recipe} />
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
  );
};

RecipeSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default RecipeSearchPage;
