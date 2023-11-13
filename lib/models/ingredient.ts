interface Ingredient {
    publicId: string;
    description: string;
    expensiveness?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    title?: string;
}
export default Ingredient;