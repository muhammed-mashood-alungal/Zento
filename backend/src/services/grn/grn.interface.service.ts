import { GRNAttributes, GRNCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IGRNService {
  findGRNById(id: number): Promise<GRNAttributes | null>;
  createGRN(grnData: GRNCreationAttributes): Promise<GRNAttributes>;
  fetchAllGRNs(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<GRNAttributes>>;
  updateGRN(
    id: number,
    grnData: Partial<GRNCreationAttributes>
  ): Promise<GRNAttributes | null>;
  deleteGRN(id: number): Promise<number>;
  generateGRNNumber() : Promise<string>
}
