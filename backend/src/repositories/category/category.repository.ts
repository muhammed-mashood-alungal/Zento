import { BaseRepository } from "../base.repository";
import { Category, CategoryAttributes } from "@/models";
import { ICategoryRepository } from "./category.interface.repository";
import { IPaginationResponse } from "@/types";
import { Attributes, FindOptions } from "sequelize";

export class CategoryRepository
  extends BaseRepository<Category>
  implements ICategoryRepository
{
  constructor() {
    super(Category);
  }

  async createCategory(data: Partial<CategoryAttributes>): Promise<Category> {
    return await this.create(data);
  }

  async fetchAllCategories(
    options: any = {}
  ): Promise<Category[]> {
    return await this.findAll({...options , where : {is_deleted : false}});
  }

  async findByCategoryId(id: string | number): Promise<Category | null> {
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
  ): Promise<Category> {
    return await this.updateById(id, {
      is_deleted: true,
    },options);
  }

  async isCategoryExists(name: string): Promise<boolean> {
    return await this.count({ where: { name } }) != 0;
  }
}
