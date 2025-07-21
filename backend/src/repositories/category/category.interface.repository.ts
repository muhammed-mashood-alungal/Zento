import { Category, ICategoryType } from "@/models";

export interface ICategoryRepository {
    createCategory(data :Partial<ICategoryType>) : Promise<Category>
}