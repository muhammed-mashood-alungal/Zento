
export interface Vendor {
  id: number;
  contact_person: string;
  phone: string;
  email: string;
  gst_number: string;
  manufacturer_id: number;
}
export interface VendorFormData extends Omit<Vendor , 'id'> {}