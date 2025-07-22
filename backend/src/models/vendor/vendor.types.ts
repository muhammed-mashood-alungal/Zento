export interface VendorAttributes {
  id: number;
  contact_person: string;
  phone: string;
  email: string;
  gst_number: string;
  manufacturer_name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface VendorCreationAttributes
  extends Omit<VendorAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}
