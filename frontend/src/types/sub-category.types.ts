
export interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  status: string;
}


export interface SubCategoryFormData extends Omit<SubCategory, "id"> {}
