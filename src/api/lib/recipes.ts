import axiosInstance from "../axios-interceptor";
import {RecipeSearchParams} from "../dto/output/recipe-search-params";

export const getRecipeSearch = (params: RecipeSearchParams) =>
  axiosInstance.get("api/recipes/v2", {params});
export const getRecipeDetails = (recipeID: string, params: any) =>
  axiosInstance.get(`/api/recipes/v2/${recipeID}`, {params});
