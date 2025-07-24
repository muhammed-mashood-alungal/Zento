import { Vendor,VendorCreationAttributes } from "@/models";


export interface IVendorRepository {
  createVendor(
    subCategory: VendorCreationAttributes
  ): Promise<Vendor>;
  fetchAllVendors(
    options?: any
  ): Promise<Vendor[]>;
  findByVendorId(id: number): Promise<Vendor | null>;
  updateVendor(
    id: number,
    subCategory: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null>;
  deleteVendor(id: number): Promise<Vendor>;
  isVendorEmailExist(email : string) : Promise<boolean>
}
