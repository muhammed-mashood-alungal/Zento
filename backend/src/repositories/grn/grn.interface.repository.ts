
import { GRNAttributes, GRNCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IGRNRepository {
  createGRN(grnData: GRNCreationAttributes): Promise<GRNAttributes>;
  fetchAllGRNs(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<GRNAttributes>>;
  findByGRNId(id: number): Promise<GRNAttributes | null>;
  updateGRN(
    id: number,
    grnData: Partial<GRNCreationAttributes>
  ): Promise<GRNAttributes | null>;
  deleteGRN(id: number): Promise<number>;
  findGRNByNumber(grn_number : string) : Promise<GRNAttributes>
}
