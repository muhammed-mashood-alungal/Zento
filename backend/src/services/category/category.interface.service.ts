import { Category, CategoryAttributes } from "@/models";
import { IPaginationResponse } from "@/types";
import { Attributes, FindOptions } from "sequelize";

export interface ICategoryServices {
  createCategoryService(categoryData: CategoryAttributes): Promise<Category>;
  fetchAllCategories(
    options?: any
  ): Promise<Category[]>;
  findByCategoryId(id: string | number): Promise<Category | null>;
  editCategory(
    id: string | number,
    values: Partial<Attributes<Category>>,
    options?: FindOptions<Attributes<Category>>
  ): Promise<Category | null>;
  deleteCategory(
    id: string | number,
    options?: FindOptions<Attributes<Category>>
  ): Promise<Category>;
}
