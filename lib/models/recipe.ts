import CuisineType from "./cuisine-type";
import Ingredient from "./ingredient";
import Tool from "./tool";

class Recipe extends Bundleable {
  publicId: string;
  title: string;
  description?: string | null;
  cuisineTypeId: string;
  cuisineType?: CuisineType | null;
  estimatedTime?: string | null;
  servingsMultiplier: number;
  rating?: number | null;
  deliciousness?: number | null;
  ingredients?: string | null;
  tools?: string | null;
  difficulty?: number | null;
  steps?: string | null;
  createdAt?: Date | null; // Adjust the type according to how you handle dates in your application
  updatedAt?: Date | null; // Adjust the type according to how you handle dates in your application
  deletedAt?: Date | null; // Adjust the type according to how you handle dates in your application
  odCover?: string | null;
  odVideo?: string | null;
  tips?: string | null;

  constructor(
    publicId: string,
    title: string,
    description: string,
    cuisineTypeId: string,
    cuisineType: CuisineType,
    estimatedTime: string,
    servingsMultiplier: number,
    rating: number,
    deliciousness: number,
    ingredients: string,
    tools: string,
    difficulty: number,
    steps: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    odCover: string,
    odVideo: string,
    tips: string,
  ) {
    super(publicId, title);
    this.title = title;
    this.description = description;
    this.cuisineTypeId = cuisineTypeId;
    this.cuisineType = cuisineType;
    this.estimatedTime = estimatedTime;
    this.servingsMultiplier = servingsMultiplier;
    this.rating = rating;
    this.deliciousness = deliciousness;
    this.ingredients = ingredients;
    this.tools = tools;
    this.difficulty = difficulty;
    this.steps = steps;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.odCover = odCover;
    this.odVideo = odVideo;
    this.tips = tips;
  }
}

export default Recipe;
