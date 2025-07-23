import {
  SubCategory,
  SubCategoryAttributes,
  SubCategoryCreationAttributes,
} from "@/models";
import { IPaginationResponse } from "@/types";

export interface ISubCategoryRepository {
  createSubCategory(
    subCategory: SubCategoryCreationAttributes
  ): Promise<SubCategory>;
  fetchAllSubCategoriesofCategory(
    category_id: number,
    page: number,
    limit: number
  ): Promise<IPaginationResponse<SubCategory>>;
  findBySubCategoryId(id: number): Promise<SubCategory | null>;
  updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryCreationAttributes>
  ): Promise<SubCategory | null>;
  deleteSubCategory(id: number): Promise<number>;
  isSubCategoryExist(category_id : number ,name : string) :Promise<boolean>
}
