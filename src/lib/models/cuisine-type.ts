interface CuisineType extends Bundleable {
  publicId: string;
  title: string;
  description?: string;
  createdAt: Date; // Assuming you parse timestamps as strings
  updatedAt: Date;
  deletedAt?: Date;
}

export default CuisineType;
