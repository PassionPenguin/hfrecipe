import CuisineType from "./cuisine-type";
import Ingredient from "./ingredient";
import Tool from "./tool";

interface Recipe {
  publicId: string;
  title: string;
  description?: string | null;
  cuisineTypeId: string;
  cuisineType: CuisineType;
  estimatedTime?: string | null;
  servingsMultiplier: number;
  rating?: number | null;
  deliciousness?: number | null;
  ingredients?: Ingredient[];
  tools?: Tool[];
  difficulty?: number | null;
  steps?: string | null;
  createdAt?: string | null; // Adjust the type according to how you handle dates in your application
  updatedAt?: string | null; // Adjust the type according to how you handle dates in your application
  deletedAt?: string | null; // Adjust the type according to how you handle dates in your application
  odCover?: string | null;
  odVideo?: string | null;
  tips?: string | null;
}

export default Recipe;
