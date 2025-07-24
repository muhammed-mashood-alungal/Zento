import { SubCategory, SubCategoryAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface ISubCategoryService {
  createSubCategory(
    subCategory: SubCategoryAttributes
  ): Promise<SubCategory>;
  updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryAttributes>
  ): Promise<SubCategory | null>;
  fetchAllSubCategoriesofCategory(
    category_id: number,
    page: number,
    limit: number
  ): Promise<IPaginationResponse<SubCategory>>;
  getSubCategoryById(id: number): Promise<SubCategory | null>;
  deleteSubCategory(id: number): Promise<SubCategory>;
}
