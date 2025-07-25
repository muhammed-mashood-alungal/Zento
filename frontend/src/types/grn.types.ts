import type { Branch } from "./branch.types";
import type { Vendor } from "./vendor.types";

export interface GRNHeaderAttributes {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor_id: number;
  vendor : string;
  branch : string;
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
export interface GRNCreatePayload {
  mode: "draft" | "submit";
  header: Partial<Omit<GRNHeaderCreationAttributes, "mode">>;
  line_items: Partial<GRNLineItemAttributes>[];
}

export interface GRNAttributes extends GRNHeaderAttributes {
  line_items?: GRNLineItemAttributes[];
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

export interface GRNFormData {
  grn_number: string;
  grn_date: string;
  vendor_id: number;
  branch_id: number ;
  invoice_number: string;
  total_amount: number;
}

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  tax_percentage: number;
  taxable_amount: number;
  total_amount: number;
  grn_header_id?: number;
  sub_category_id: number;
  category_id: number;
}

export type LineItemErrors = Record<string, Partial<Record<keyof LineItem, string>>>;


export interface GRNResponseAttributes {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor: Vendor;
  branch: Branch;
  total_amount: number;
  mode: "submit" | "draft";
  created_at: Date;
  updated_at: Date;
  line_items: GRNLineItemAttributes[];
}

