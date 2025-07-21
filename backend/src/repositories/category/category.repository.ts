import { BaseRepository } from "../base.repository";
import { Category, ICategoryType } from "@/models";
import { ICategoryRepository } from "./category.interface.repository";
import { IPaginationResponse } from "@/types/api-response.types";
import { Attributes, FindOptions } from "sequelize";

export class CategoryRepository
  extends BaseRepository<Category>
  implements ICategoryRepository
{
  constructor() {
    super(Category);
  }

  async createCategory(data: Partial<ICategoryType>): Promise<Category> {
    return await this.create(data);
  }

  async fetchAllCategories(
    page: number,
    limit: number,
    options: any = {}
  ): Promise<IPaginationResponse<Category>> {
    return await this.paginate(page, limit, options);
  }

  async findByCategoryId(
    id: string | number
  ): Promise<Category | null> {
    return await this.findById(id);
  }

  async editCategory(
    id: string | number,
    values: Partial<Attributes<Category>>,
    options: FindOptions<Attributes<Category>>
  ): Promise<Category | null> {
    return await this.updateById(id, values, options);
  }

  async deleteCategory(
    id: string | number,
    options?: FindOptions<Attributes<Category>>
  ): Promise<number> {
    return await this.deleteById(id, options);
  }
}
