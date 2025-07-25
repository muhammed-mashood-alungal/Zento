import {
  GRNAttributes,
  GRNCreationAttributes,
  GRNResponseAttributes,
} from "@/models";
import { IGRNService } from "./grn.interface.service";
import { IPaginationResponse } from "@/types";
import { IGRNRepository } from "@/repositories";
import { v4 as uuid } from "uuid";
import ExcelJS from "exceljs";
import { Response } from "express";

export class GrnService implements IGRNService {
  constructor(private grnRepository: IGRNRepository) {}

  async findGRNById(id: number): Promise<GRNResponseAttributes | null> {
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
      exists = await this.grnRepository.findGRNByNumber(grnNumber);
    } while (exists);

    return grnNumber;
  }
  async generateReport(filters: any, res: Response) {
    const grns = await this.grnRepository.findFilteredGRNs(filters);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("GRN Report");

    
    sheet.addRow([
      "GRN Number",
      "GRN Date",
      "Invoice Number",
      "Vendor",
      "Branch",
      "Total Amount",
    ]);

  
    grns.forEach((grn) => {
      sheet.addRow([
        grn.grn_number,
        grn.grn_date?.toISOString().split("T")[0] || "-",
        grn.invoice_number,
        grn.Vendor?.contact_person || "-",
        grn.Branch?.name || "-",
        grn.total_amount,
      ]);
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=grn-report.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  }
}
