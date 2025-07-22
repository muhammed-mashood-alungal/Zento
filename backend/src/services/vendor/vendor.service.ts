import { Vendor, VendorAttributes, VendorCreationAttributes } from "@/models";
import { IVendorRepository } from "@/repositories/vendor/vendor.interface.repository";
import { IPaginationResponse } from "@/types/api-response.types";
import { IVendorService } from "./vendor.interface.service";

export class VendorServices implements IVendorService {
  constructor(private vendorRepository: IVendorRepository) {}

  async createVendor(
    vendor: VendorCreationAttributes
  ): Promise<VendorAttributes> {
    return this.vendorRepository.createVendor(vendor);
  }

  async fetchAllVendors(
    page: number,
    limit: number
  ): Promise<IPaginationResponse<VendorAttributes>> {
    return this.vendorRepository.fetchAllVendors(page, limit);
  }

  async findByVendorId(id: number): Promise<VendorAttributes | null> {
    return this.vendorRepository.findByVendorId(id);
  }

  async editVendor(
    id: number,
    vendor: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null> {
    return this.vendorRepository.editVendor(id, vendor);
  }
  async deleteVendor(id: number): Promise<number> {
    return this.vendorRepository.deleteVendor(id);
  }
  async changeVendorStatus(id: number, status: string): Promise<Vendor | null> {
    return this.vendorRepository.changeVendorStatus(id, status);
  }
}
