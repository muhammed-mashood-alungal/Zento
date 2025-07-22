import { GRNAttributes, GRNCreationAttributes } from "@/models";
import { IGRNService } from "./grn.interface.service";
import { IPaginationResponse } from "@/types";
import { IGRNRepository } from "@/repositories";

export class GrnService implements IGRNService {
  constructor(private grnRepository: IGRNRepository) {}

  async findGRNById(id: number): Promise<GRNAttributes | null> {
    return await this.grnRepository.findByGRNId(id);
  }

  async createGRN(grnData: GRNCreationAttributes): Promise<GRNAttributes> {
    return await this.grnRepository.createGRN(grnData);
  }
  async updateGRN(
    id: number,
    updates: Partial<GRNAttributes>
  ): Promise<GRNAttributes | null> {
    return await this.grnRepository.updateGRN(id, updates);
  }
  async deleteGRN(id: number): Promise<number> {
    return await this.grnRepository.deleteGRN(id);
  }
  async fetchAllGRNs(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<GRNAttributes>> {
    return await this.grnRepository.fetchAllGRNs(page, limit, options);
  }
}
