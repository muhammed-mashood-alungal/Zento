export interface CategoryAttributes {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor_id: number;
  branch_id: number;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryCreationAttributes
  extends Omit<CategoryAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICategoryType {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor_id: number;
  branch_id: number;
  created_by: number;
}
