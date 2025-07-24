export interface GRNHeaderAttributes {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor_id: number;
  branch_id: number;
  total_amount: number;
  mode: "submit" | "draft";
  created_at: Date;
  updated_at: Date;
}

export interface GRNHeaderCreationAttributes
  extends Omit<GRNHeaderAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface GRNAttributes extends GRNHeaderAttributes {
  line_items: GRNLineItemAttributes[];
}

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
