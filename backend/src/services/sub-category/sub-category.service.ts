import { RESPONSE_MESSAGES } from "@/constants";
import { SubCategory, SubCategoryAttributes } from "@/models";
import { ISubCategoryRepository } from "@/repositories";
import { IPaginationResponse } from "@/types";
import { createHttpsError } from "@/utils";
import { StatusCodes } from "http-status-codes";

export class SubCategoryService {
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  async createSubCategory(
    subCategory: SubCategoryAttributes
  ): Promise<SubCategory> {
    const isExist = await this.subCategoryRepository.isSubCategoryExist(subCategory.category_id , subCategory.name)
    if(isExist){
      throw createHttpsError(StatusCodes.CONFLICT , RESPONSE_MESSAGES.SUB_CATEGORY_EXISTS)
    }
    return await this.subCategoryRepository.createSubCategory(subCategory);
  }
  async updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryAttributes>
  ): Promise<SubCategory | null> {
    return await this.subCategoryRepository.updateSubCategory(id, subCategory);
  }

  async fetchAllSubCategoriesofCategory(
    category_id: number,
    page: number,
    limit: number
  ): Promise<IPaginationResponse<SubCategory>> {
    return await this.subCategoryRepository.fetchAllSubCategoriesofCategory(
      category_id,
      page,
      limit
    );
  }

  async getSubCategoryById(id: number): Promise<SubCategory | null> {
    return await this.subCategoryRepository.findBySubCategoryId(id);
  }
  async deleteSubCategory(id: number): Promise<SubCategory> {
    return await this.subCategoryRepository.deleteSubCategory(id);
  }
}
