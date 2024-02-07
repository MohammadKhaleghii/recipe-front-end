import { ParamsBase } from "../shared/params-base";

export interface RecipeSearchParams extends ParamsBase {
  diet?: string[];
  health?: string[];
  cuisineType?: string[];
  q?: string;
  imageSize: "LARGE" | "REGULAR" | "SMALL" | "THUMBNAIL";
}
