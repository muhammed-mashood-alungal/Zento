import { ICategoryRepository } from "@/repositories";
import { ICategoryServices } from "./category.interface.service";
import { Category, CategoryAttributes,  } from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";
import { Attributes, FindOptions } from "sequelize";

export class CategoryServices implements ICategoryServices {
  constructor(private categoryRepository: ICategoryRepository) {}

  async createCategoryService(categoryData: CategoryAttributes): Promise<Category> {
    return await this.categoryRepository.createCategory(categoryData);
  }
  async fetchAllCategories(
    page: number,
    limit: number,
    options: any = {}
  ): Promise<IPaginationResponse<Category>> {
    return await this.categoryRepository.fetchAllCategories(
      page,
      limit,
      options
    );
  }

  async findByCategoryId(id: string | number): Promise<Category | null> {
    return await this.categoryRepository.findByCategoryId(id);
  }
  async editCategory(
    id: string | number,
    values: Partial<Attributes<Category>>,
    options?: FindOptions<Attributes<Category>>
  ): Promise<Category | null> {
    return await this.categoryRepository.editCategory(id, values, options);
  }
  async deleteCategory(
    id: string | number,
    options?: FindOptions<Attributes<Category>>
  ): Promise<number> {
    return await this.categoryRepository.deleteCategory(id, options);
  }
}
