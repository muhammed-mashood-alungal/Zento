import { Vendor, VendorAttributes, VendorCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";

export interface IVendorService {
  createVendor(vendor: VendorCreationAttributes): Promise<VendorAttributes>;
  fetchAllVendors(
    page: number,
    limit: number
  ): Promise<IPaginationResponse<VendorAttributes>>;
  findByVendorId(id: number): Promise<VendorAttributes | null>;
  editVendor(
    id: number,
    vendor: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null>;
  deleteVendor(id: number): Promise<number>;
  changeVendorStatus(id: number, status: string): Promise<Vendor | null>;
}
