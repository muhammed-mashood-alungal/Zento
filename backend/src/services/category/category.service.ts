import { ICategoryRepository } from "@/repositories";
import { ICategoryServices } from "./category.interface.service";
import { Category, ICategoryType } from "@/models";

export class CategoryServices implements ICategoryServices {
  constructor(private categoryRepository: ICategoryRepository) {}

 async createCategoryService(categoryData: ICategoryType): Promise<Category> {
    return await this.categoryRepository.createCategory(categoryData)
  }
}
