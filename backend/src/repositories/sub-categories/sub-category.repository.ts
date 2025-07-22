import {
  SubCategory,
  SubCategoryCreationAttributes,
} from "@/models";
import { BaseRepository } from "../base.repository";
import { ISubCategoryRepository } from "./sub-category.interface.repository";
import { IPaginationResponse } from "@/types";

export class SubCategoryRepository
  extends BaseRepository<SubCategory>
  implements ISubCategoryRepository
{
  constructor() {
    super(SubCategory);
  }

  async createSubCategory(
    subCategory: SubCategoryCreationAttributes
  ): Promise<SubCategory> {
    return this.create(subCategory);
  }

  async fetchAllSubCategoriesofCategory(
    category_id: number,
    page: number,
    limit: number
  ): Promise<IPaginationResponse<SubCategory>> {
    return this.paginate(page, limit, { where: { category_id } });
  }

  async findBySubCategoryId(id: number): Promise<SubCategory | null> {
    return this.findById(id);
  }

  async updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryCreationAttributes>
  ): Promise<SubCategory | null> {
    return await this.updateById(id, subCategory);
  }
  async deleteSubCategory(id: number): Promise<number> {
    return await this.deleteById(id);
  }
}
