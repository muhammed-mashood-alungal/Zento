import { GRNLineItemAttributes } from "../grn-line-items/grn-line-items.types";

export interface GRNHeaderAttributes {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor_id: number;
  branch_id: number;
  total_amount: number;
  status: "submit" | "draft";
  created_at: Date;
  updated_at: Date;
}

export interface GRNHeaderCreationAttributes
  extends Omit<GRNHeaderAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface GRNAttributes
  extends GRNHeaderAttributes {
    line_items: GRNLineItemAttributes[];
  }

export interface GRNCreationAttributes{
    header: GRNHeaderCreationAttributes;
    line_items: GRNLineItemAttributes[];
}

