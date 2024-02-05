import {ParamsBase} from "../shared/params-base";

export interface RecipeSearchParams extends ParamsBase {
  diet?: string;
  // health: Health;
  // cuisineType: CuisineType;
  // mealType: MealType;
  // dishType: DishType;
  q?: string;
  imageSize: "LARGE" | "REGULAR" | "SMALL" | "THUMBNAIL";
}
