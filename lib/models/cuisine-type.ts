interface CuisineType {
    publicId: string;
    title?: string;
    description?: string;
    createdAt: string; // Assuming you parse timestamps as strings
    updatedAt: string;
    deletedAt?: string;
}

export default CuisineType;