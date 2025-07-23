export interface AssetAttributes {
  id: number;
  asset_tag: string;
  grn_line_item_id: number;
  sub_category_id: number;
  branch_id: number;
  purchase_date: Date;
  status: "Assigned" | 'Pending' | 'Not-Assigned';
  condition: "Ok" | "Under Maintenance" | "Retired";
  created_at: Date;
  updated_at: Date;
}

export interface AssetCreationAttributes
  extends Omit<AssetAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}
