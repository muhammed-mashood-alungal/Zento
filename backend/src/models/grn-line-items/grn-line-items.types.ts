export interface GRNLineItemAttributes {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  tax_percentage: number;
  taxable_amount: number;
  total_amount: number;
  grn_header_id: number;
  sub_category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface GRNLIneItemCreationAttributes
  extends Omit<GRNLineItemAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}
