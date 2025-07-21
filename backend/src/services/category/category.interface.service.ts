import { Category, ICategoryType } from "@/models";

export interface ICategoryServices {
    createCategoryService(categoryData : ICategoryType) : Promise<Category>
}