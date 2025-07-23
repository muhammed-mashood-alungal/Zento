import { Vendor, VendorAttributes, VendorCreationAttributes } from "@/models";
import { IVendorRepository } from "./vendor.interface.repository";
import { BaseRepository } from "../base.repository";
import { IPaginationResponse } from "@/types";

export class VendorRepository
  extends BaseRepository<Vendor>
  implements IVendorRepository
{
  constructor() {
    super(Vendor);
  }

  async createVendor(
    vendor: VendorCreationAttributes
  ): Promise<Vendor> {
    return await this.create(vendor);
  }

  async fetchAllVendors(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Vendor>> {
    return await this.paginate(page, limit, options);
  }
  async findByVendorId(id: number): Promise<Vendor | null> {
    return await this.findById(id);
  }
  async updateVendor(
    id: number,
    vendor: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null> {
    return await this.updateById(id, vendor);
  }
  async deleteVendor(id: number): Promise<number> {
    return await this.deleteById(id);
  }
}
