import { SubCategory, SubCategoryAttributes } from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";

export interface ISubCategoryService {
  createSubCategory(
    subCategory: SubCategoryAttributes
  ): Promise<SubCategoryAttributes>;
  updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryAttributes>
  ): Promise<SubCategory | null>;
  fetchAllSubCategoriesofCategory(
    category_id: number,
    page: number,
    limit: number
  ): Promise<IPaginationResponse<SubCategory>>;
  getSubCategoryById(id: number): Promise<SubCategoryAttributes | null>;
  deleteSubCategory(id: number): Promise<number>;
}
