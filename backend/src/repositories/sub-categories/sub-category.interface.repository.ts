import {
  SubCategory,
  SubCategoryCreationAttributes,
} from "@/models";

export interface ISubCategoryRepository {
  createSubCategory(
    subCategory: SubCategoryCreationAttributes
  ): Promise<SubCategory>;
  fetchAllSubCategoriesofCategory(
    category_id: number,
  ): Promise<SubCategory[]>;
  findBySubCategoryId(id: number): Promise<SubCategory | null>;
  updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryCreationAttributes>
  ): Promise<SubCategory | null>;
  deleteSubCategory(id: number): Promise<SubCategory>;
  isSubCategoryExist(category_id : number ,name : string) :Promise<boolean>
}
