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

  async createVendor(vendor: VendorCreationAttributes): Promise<Vendor> {
    return await this.create(vendor);
  }

  async fetchAllVendors(options?: any): Promise<Vendor[]> {
    return await this.findAll({ ...options, where: { is_deleted: false } });
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
  async deleteVendor(id: number): Promise<Vendor> {
    return await this.updateById(id, {
      is_deleted: true,
    });
  }

  async isVendorEmailExist(email: string): Promise<boolean> {
    return (await this.count({ where: { email } })) != 0;
  }
}
