
export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
}


export interface SubCategoryFormData extends Omit<SubCategory, "id"> {}
