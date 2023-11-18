class CuisineType extends Bundleable {
  publicId: string;
  title: string;
  description?: string;
  createdAt: Date; // Assuming you parse timestamps as strings
  updatedAt: Date;
  deletedAt?: Date;

  constructor(
    publicId: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
  ) {
    super(publicId, title);
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export default CuisineType;
