import {RecipeSearch} from "@/api/dto/input/recipe-search";
import {RecipeSearchParams} from "@/api/dto/output/recipe-search-params";
import {getRecipeSearch} from "@/api/lib/recipes";
import RecipeButton from "@/components/button";
import RecipeInput from "@/components/input";
import RecipeItem from "@/components/recipe-item";
import RecipeItemSkeleton from "@/components/recipe-item/recipe-item-skeleton";
import {MenuContext} from "@/context/menu-provider";
import PublicLayout from "@/layouts/public-layout";
import {Global, css} from "@emotion/react";
import {useRouter} from "next/router";
import {ReactElement, useContext, useEffect, useState} from "react";

const RecipeSearchPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const {isMobileFilterMenuOpen, setIsMobileFilterMenuOpen} =
    useContext(MenuContext);
  let [selectedDietFilter, setSelectedDietFilter] = useState<string[]>([]);
  let [selectedHealthFilter, setSelectedHealthFilter] = useState<string[]>([]);
  let [selectedCuisineTypeFilter, setSelectedCuisineTypeFilter] = useState<
    string[]
  >([]);

  const [recipeSearchItems, setRecipeSearchItems] = useState<RecipeSearch>();
  const [searchedQuery, setSearchedQuery] = useState(
    router.query.q?.toString() ?? ""
  );

  const muckArrayForSkeleton = new Array(9).fill(0);
  useEffect(() => {
    const searchParams: RecipeSearchParams = {
      beta: false,
      imageSize: "LARGE",
      type: "any",
      diet: "balanced",
      q: router.query.q?.toString() ?? "",
    };
    // if (true) {
    //   const diet = router.query.diet?.toString().split(",");
    //   console.log(diet);
    //   searchParams.diet = diet;
    // }
    setLoading(true);
    getRecipeSearch(searchParams)
      .then(({data}) => {
        const recipeItemsTenFirstItems = data.hits.slice(0, 41);
        const recipe: RecipeSearch = {
          ...data,
          hits: recipeItemsTenFirstItems,
        };
        setRecipeSearchItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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
            (item) => item !== key
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
            (item) => item !== key
          );
          setSelectedHealthFilter(newHealthArray);
          break;
        }
        setSelectedHealthFilter([...selectedHealthFilter, key]);
        break;
      case 3:
        const findCuisineType = selectedCuisineTypeFilter.find(
          (item) => item === key
        );
        if (findCuisineType) {
          const newCuisineTypeArray = selectedCuisineTypeFilter.filter(
            (item) => item !== key
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
          (item) => item === key
        );
        if (findCuisineType) {
          return false;
        }

        return true;
    }
  };

  const handleApplyFilter = () => {
    setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen);
    router.push({
      query: {
        diet: selectedDietFilter.toString(),
        health: selectedHealthFilter.toString(),
        cuisineType: selectedCuisineTypeFilter.toString(),
      },
    });
  };

  const filter = (
    <>
      {" "}
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
            defaultValue={router.query.q?.toString() ?? ""}
            onChange={(event) => setSearchedQuery(event.target.value)}
            placeholder="search by...."
            value={searchedQuery}
            width="w-full"
            height="h-[40px]"
          />
          <button
            onClick={() =>
              router.push({
                query: {
                  q: searchedQuery,
                },
              })
            }
            className="bg-primary rounded-md px-3 py-2"
          >
            <i className=" fas fa-search text-white cursor-pointer"></i>
          </button>
        </div>
        <div>
          {sidebarFilters.map((sidebarItem) => (
            <div>
              <div className="pt-3 font-bold">{sidebarItem.title}</div>
              {sidebarItem.children.map((item) => (
                <div
                  onClick={() => handleSearchFilters(sidebarItem.key, item.key)}
                  className="flex items-center justify-start gap-x-2 cursor-pointer"
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
          <RecipeButton
            onClick={() => handleApplyFilter()}
            UIType="secondary"
            width="w-full"
            mainText="Apply Filters"
          />
        </div>
        <div className="pt-5 lg:hidden block lg:pt-0 ">
          <RecipeButton
            onClick={() => setIsMobileFilterMenuOpen(false)}
            UIType="primary"
            width="w-full"
            mainText="Close"
          />
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
    <div className="mx-auto my-10 w-full max-w-screen-xl px-4 flex flex-row lg:justify-between justify-around gap-x-3">
      <Global styles={updateBodyStyle()} />
      <section className="lg:w-1/4 lg:block hidden  h-full border border-gray-300  rounded-md p-2">
        {filter}
      </section>
      <section className="lg:w-3/4 w-4/4">
        <div
          onClick={() => setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen)}
          className=" flex-row items-center  lg:hidden flex  gap-x-2"
        >
          <i className="fa-regular fa-filter text-lg"></i>
          <button className="font-bold text-xl my-4">Filters</button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 items-center lg:justify-between  w-full">
          {!loading &&
            recipeSearchItems &&
            recipeSearchItems.hits.map(({recipe, _links}) => (
              <RecipeItem key={recipe.label} _links={_links} recipe={recipe} />
            ))}
          {loading &&
            muckArrayForSkeleton.map((item, index) => (
              <RecipeItemSkeleton key={index} />
            ))}
        </div>
      </section>
      {isMobileFilterMenuOpen && (
        <section className="fixed w-full h-[90%] bottom-0 bg-white rounded-e-md z-50 p-4 overflow-y-scroll">
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
