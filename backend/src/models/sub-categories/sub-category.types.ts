export interface SubCategoryAttributes {
  id: number;
  name: string;
  description: string;
  status: string;
  is_deleted:boolean
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface SubCategoryCreationAttributes
  extends Omit<SubCategoryAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

