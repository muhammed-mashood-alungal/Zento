import { Category, CategoryAttributes } from "@/models";
import { IPaginationResponse } from "@/types/pagination.types";
import { Attributes, FindOptions } from "sequelize";

export interface ICategoryRepository {
  createCategory(data: Partial<CategoryAttributes>): Promise<Category>;
  fetchAllCategories(
    options: any
  ): Promise<Category[]>;
  findByCategoryId(id: string | number): Promise<Category | null>;
  editCategory(
    id: string | number,
    values: Partial<Attributes<Category>>,
    options: FindOptions<Attributes<Category>>
  ): Promise<Category | null>;
  deleteCategory(
    id: string | number,
    options?: FindOptions<Attributes<Category>>
  ): Promise<Category>;
  isCategoryExists(name : string) : Promise<boolean>
}
