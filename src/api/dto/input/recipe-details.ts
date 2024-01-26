export interface RecipeDetailsInput {
  recipe: RecipeDetails;
  _links: Links;
}

interface RecipeDetails {
  uri: string;
  label: string;
  image: string;
  images: Images;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  glycemicIndex: number;
  inflammatoryIndex: number;
  totalCO2Emissions: number;
  co2EmissionsClass: string;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  instructions: string[];
  tags: string[];
  externalId: string;
  totalNutrients: TotalNutrients;
  totalDaily: TotalDaily;
  digest: Digest[];
}

interface Images {
  THUMBNAIL: Thumbnail;
  SMALL: Small;
  REGULAR: Regular;
  LARGE: Large;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Small {
  url: string;
  width: number;
  height: number;
}

interface Regular {
  url: string;
  width: number;
  height: number;
}

interface Large {
  url: string;
  width: number;
  height: number;
}

interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodId: string;
}

interface TotalNutrients {}

interface TotalDaily {}

interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub: Sub;
}

interface Sub {}

interface Links {
  self: Self;
  next: Next;
}

interface Self {
  href: string;
  title: string;
}

interface Next {
  href: string;
  title: string;
}
