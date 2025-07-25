import { SubCategory, SubCategoryCreationAttributes } from "@/models";
import { BaseRepository } from "../base.repository";
import { ISubCategoryRepository } from "./sub-category.interface.repository";
import { IPaginationResponse } from "@/types";

export class SubCategoryRepository
  extends BaseRepository<SubCategory>
  implements ISubCategoryRepository
{
  constructor() {
    super(SubCategory);
  }

  async createSubCategory(
    subCategory: SubCategoryCreationAttributes
  ): Promise<SubCategory> {
    console.log(subCategory)
    return this.create(subCategory);
  }

  async fetchAllSubCategoriesofCategory(
    category_id: number,
  ): Promise<SubCategory[]> {
    return this.findAll({ where: { category_id ,is_deleted : false} });
  }

  async findBySubCategoryId(id: number): Promise<SubCategory | null> {
    return await this.findOne({ where: { category_id: id }, raw: true });
    
  }

  async updateSubCategory(
    id: number,
    subCategory: Partial<SubCategoryCreationAttributes>
  ): Promise<SubCategory | null> {
    return await this.updateById(id, subCategory);
  }
  async deleteSubCategory(id: number): Promise<SubCategory> {
    return await this.updateById(id,{
      is_deleted : true
    });
  }
  async isSubCategoryExist(category_id : number ,name: string): Promise<boolean> {
    return (await this.count({ where: { name  , category_id , is_deleted : false} })) != 0;
  }
}
