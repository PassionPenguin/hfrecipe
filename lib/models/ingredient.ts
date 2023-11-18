class Ingredient extends Bundleable {
  publicId: string;
  description: string;
  expensiveness?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  title: string;

  constructor(
    publicId: string,
    description: string,
    expensiveness: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
    title?: string,
  ) {
    super(publicId, title);
    this.description = description;
    this.expensiveness = expensiveness;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
export default Ingredient;
