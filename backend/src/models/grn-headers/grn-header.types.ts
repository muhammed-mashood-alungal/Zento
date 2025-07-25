import { BranchAttributes } from "../branch/branch.types";
import { GRNLineItemAttributes } from "../grn-line-items/grn-line-items.types";
import { VendorAttributes } from "../vendor/vendor.types";

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

export interface GRNCreationAttributes {
  mode: "submit" | "draft";
  header: GRNHeaderCreationAttributes;
  line_items: GRNLineItemAttributes[];
}

export interface GRNReseponAttribute extends GRNHeaderAttributes {
  line_items: GRNLineItemAttributes[];
}

export interface GRNResponseAttributes {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor: VendorAttributes;
  branch: BranchAttributes;
  total_amount: number;
  mode: "submit" | "draft";
  created_at: Date;
  updated_at: Date;
  line_items: GRNLineItemAttributes[];
}
