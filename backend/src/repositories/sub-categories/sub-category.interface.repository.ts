import { SubCategory, SubCategoryAttributes, SubCategoryCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";

export interface ISubCategoryRepository {
  createSubCategory(
    subCategory: SubCategoryCreationAttributes
  ): Promise<SubCategoryAttributes>;
  fetchAllSubCategoriesofCategory(
    category_id: number,
    page: number,
    limit: number
  ): Promise<IPaginationResponse<SubCategory>>;
  findBySubCategoryId(id: number): Promise<SubCategoryAttributes | null>;
  editSubCategory(
    id: number,
    subCategory: Partial<SubCategoryCreationAttributes>
  ): Promise<SubCategory | null>;
  deleteSubCategory(id: number): Promise<number>;
}
