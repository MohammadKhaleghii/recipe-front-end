import {RecipeDetailsInput} from "@/api/dto/input/recipe-details";
import {RecipeSearchParams} from "@/api/dto/output/recipe-search-params";
import {getRecipeDetails} from "@/api/lib/recipes";
import PublicLayout from "@/layouts/public-layout";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";

const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsInput>();

  const {
    query: {id},
  } = useRouter();
  const recipeID = id?.toString() ?? "";
  console.log(recipeID);

  useEffect(() => {
    const searchParams: RecipeSearchParams = {
      app_id: "d29e7d29",
      app_key: "a5d799d39df62345f05f8d36489e5953",
      beta: false,
      diet: "balanced",
      imageSize: "LARGE",
      type: "public",
    };
    if (recipeID) {
      getRecipeDetails(recipeID, searchParams)
        .then(({data}) => {
          setRecipeDetails(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [recipeID]);
  return (
    <div className="px-4 mx-auto w-full max-w-screen-xl">details page</div>
  );
};

export default RecipeDetails;

RecipeDetails.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
