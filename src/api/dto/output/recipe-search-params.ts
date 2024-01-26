import {ParamsBase} from "../shared/params-base";

export interface RecipeSearchParams extends ParamsBase {
  diet:
    | "balanced"
    | "high-fiber"
    | "high-protein"
    | "low-carb"
    | "low-fat"
    | "low-sodium";
  // health: Health;
  // cuisineType: CuisineType;
  // mealType: MealType;
  // dishType: DishType;
  imageSize: "LARGE" | "REGULAR" | "SMALL" | "THUMBNAIL";
}
