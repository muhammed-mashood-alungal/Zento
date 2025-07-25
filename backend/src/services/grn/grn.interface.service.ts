import {
  GRNAttributes,
  GRNCreationAttributes,
  GRNResponseAttributes,
} from "@/models";
import { IPaginationResponse } from "@/types";
import { Response } from "express";

export interface IGRNService {
  findGRNById(id: number): Promise<GRNResponseAttributes | null>;
  createGRN(grnData: GRNCreationAttributes): Promise<GRNAttributes>;
  fetchAllGRNs(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<GRNResponseAttributes>>;
  updateGRN(
    id: number,
    grnData: Partial<GRNCreationAttributes>
  ): Promise<GRNAttributes | null>;
  deleteGRN(id: number): Promise<number>;
  generateGRNNumber(): Promise<string>;
  generateReport(filters: any, res: Response): any;
}
