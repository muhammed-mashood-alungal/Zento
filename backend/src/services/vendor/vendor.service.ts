import { Vendor, VendorCreationAttributes } from "@/models";
import { IVendorRepository } from "@/repositories";
import { IPaginationResponse } from "@/types";
import { IVendorService } from "./vendor.interface.service";
import { createHttpsError } from "@/utils";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "@/constants";

export class VendorServices implements IVendorService {
  constructor(private vendorRepository: IVendorRepository) {}

  async createVendor(vendor: VendorCreationAttributes): Promise<Vendor> {
    const isExist = await this.vendorRepository.isVendorEmailExist(
      vendor.email
    );
    if (isExist) {
      throw createHttpsError(
        StatusCodes.CONFLICT,
        RESPONSE_MESSAGES.VENDOR_EXISTS
      );
    }
    return this.vendorRepository.createVendor(vendor);
  }

  async fetchAllVendors(
    page: number,
    limit: number
  ): Promise<IPaginationResponse<Vendor>> {
    return this.vendorRepository.fetchAllVendors(page, limit);
  }

  async findByVendorId(id: number): Promise<Vendor | null> {
    return this.vendorRepository.findByVendorId(id);
  }

  async editVendor(
    id: number,
    vendor: Partial<VendorCreationAttributes>
  ): Promise<Vendor | null> {
    return this.vendorRepository.updateVendor(id, vendor);
  }
  async deleteVendor(id: number): Promise<number> {
    return this.vendorRepository.deleteVendor(id);
  }
}
