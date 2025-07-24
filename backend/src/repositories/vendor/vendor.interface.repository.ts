import { Vendor, VendorAttributes, VendorCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IVendorRepository {
  createVendor(
    subCategory: VendorCreationAttributes
  ): Promise<Vendor>;
  fetchAllVendors(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Vendor>>;
  findByVendorId(id: number): Promise<Vendor | null>;
  updateVendor(
    id: number,
    subCategory: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null>;
  deleteVendor(id: number): Promise<Vendor>;
  isVendorEmailExist(email : string) : Promise<boolean>
}
