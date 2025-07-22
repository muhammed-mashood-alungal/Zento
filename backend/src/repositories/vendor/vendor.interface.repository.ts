import { Vendor, VendorAttributes, VendorCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";

export interface IVendorRepository {
  createVendor(
    subCategory: VendorCreationAttributes
  ): Promise<VendorAttributes>;
  fetchAllVendors(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Vendor>>;
  findByVendorId(id: number): Promise<VendorAttributes | null>;
  editVendor(
    id: number,
    subCategory: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null>;
  deleteVendor(id: number): Promise<number>;
  changeVendorStatus(id: number, status: string): Promise<Vendor | null>;
}
