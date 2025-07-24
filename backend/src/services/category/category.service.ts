import { ICategoryRepository } from "@/repositories";
import { ICategoryServices } from "./category.interface.service";
import { Category, CategoryAttributes } from "@/models";
import { IPaginationResponse } from "@/types";
import { Attributes, FindOptions } from "sequelize";
import { createHttpsError } from "@/utils";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "@/constants";

export class CategoryServices implements ICategoryServices {
  constructor(private categoryRepository: ICategoryRepository) {}

  async createCategoryService(
    categoryData: CategoryAttributes
  ): Promise<Category> {
    const isExist = await this.categoryRepository.isCategoryExists(
      categoryData.name
    );
    if (isExist) {
      throw createHttpsError(
        StatusCodes.CONFLICT,
        RESPONSE_MESSAGES.CATEGORY_EXISTS
      );
    }
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
  ): Promise<Category> {
    return await this.categoryRepository.deleteCategory(id, options);
  }
}
