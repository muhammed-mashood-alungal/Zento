
export interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface CategoryFormData extends Omit<Category, "id"> {}
