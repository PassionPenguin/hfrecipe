interface Tool extends Bundleable {
  publicId: string;
  description: string;
  expensiveness?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  title: string;
}

export default Tool;
