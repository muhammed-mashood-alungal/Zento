import { GRNAttributes, GRNCreationAttributes, GRNResponseAttributes } from "@/models";
import { IGRNService } from "./grn.interface.service";
import { IPaginationResponse } from "@/types";
import { IGRNRepository } from "@/repositories";
import { v4 as uuid } from "uuid";

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
  ): Promise<IPaginationResponse<GRNResponseAttributes>> {
    return await this.grnRepository.fetchAllGRNs(page, limit, options);
  }

  async generateGRNNumber(): Promise<string> {
    let exists = null;
    let grnNumber: string;
    do {
      const today = new Date();
      const YYYY = today.getFullYear().toString().padStart(4, "0").trim();
      const MM = today.getMonth().toString().padStart(2, "0").trim();

      const XXX = uuid().slice(-3).toUpperCase();
      grnNumber = `GRN-${YYYY + MM}-${XXX}`;
      exists = await this.grnRepository.findGRNByNumber(grnNumber)
    } while (exists);

    return grnNumber;
  }
}
