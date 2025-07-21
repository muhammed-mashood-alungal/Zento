import { SubCategory, SubCategoryAttributes } from "@/models";
import { ISubCategoryRepository } from "@/repositories";
import { IPaginationResponse } from "@/types/api-response.types";

export class SubCategoryService {
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  async createSubCategory(
    subCategory: SubCategoryAttributes
  ): Promise<SubCategoryAttributes> {
    return await this.subCategoryRepository.createSubCategory(subCategory);
  }
  async updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryAttributes>
  ): Promise<SubCategory | null> {
    return await this.subCategoryRepository.editSubCategory(id, subCategory);
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

  async getSubCategoryById(id: number): Promise<SubCategoryAttributes | null> {
    return await this.subCategoryRepository.findBySubCategoryId(id);
  }
  async deleteSubCategory(id: number): Promise<number> {
    return await this.subCategoryRepository.deleteSubCategory(id);
  }
}
