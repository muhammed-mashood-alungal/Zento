export interface CategoryAttributes {
  id: number;
  name: string;
  description: string;
  status: string;
  is_deleted:boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryCreationAttributes
  extends Omit<CategoryAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}
