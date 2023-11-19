import CuisineType from "./cuisine-type";

interface Recipe extends Bundleable {
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
}

export default Recipe;
