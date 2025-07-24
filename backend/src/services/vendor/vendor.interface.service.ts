import { Vendor, VendorAttributes, VendorCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IVendorService {
  createVendor(vendor: VendorCreationAttributes): Promise<Vendor>;
  fetchAllVendors(
  ): Promise<Vendor[]>;
  findByVendorId(id: number): Promise<Vendor | null>;
  editVendor(
    id: number,
    vendor: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null>;
  deleteVendor(id: number): Promise<Vendor>;
}
