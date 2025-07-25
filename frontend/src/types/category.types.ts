import type { SubCategory } from "./sub-category.types";

export interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
  sub_categories? : SubCategory[]
}

export interface CategoryFormData extends Omit<Category, "id"> {}
