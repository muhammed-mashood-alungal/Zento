import { BaseRepository } from "../base.repository";
import { Category, ICategoryType } from "@/models";
import { ICategoryRepository } from "./category.interface.repository";

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
}
