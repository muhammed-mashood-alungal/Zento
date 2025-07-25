import { RESPONSE_MESSAGES } from "@/constants";
import { IGRNService } from "@/services";
import { successResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IGRNController } from "./grn.interface.controller";

export class GRNController implements IGRNController {
  constructor(private grnService: IGRNService) {}

  async findGRNById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const grnId = parseInt(req.params.id);
      const grn = await this.grnService.findGRNById(grnId);
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.GRN_FETCHED, {
        grn,
      });
    } catch (error) {
      next(error);
    }
  }
  async fetchAllGRNs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const options = req.query.options
        ? JSON.parse(req.query.options as string)
        : {};
      const grns = await this.grnService.fetchAllGRNs(
        Number(page),
        Number(limit),
        options
      );
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.GRNS_FETCHED, {
        grns,
      });
    } catch (error) {
      next(error);
    }
  }
  async createGRN(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const grnData = req.body;
      const newGRN = await this.grnService.createGRN(grnData);
      successResponse(res, StatusCodes.CREATED, RESPONSE_MESSAGES.GRN_CREATED, {
        grn: newGRN,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateGRN(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const grnId = parseInt(req.params.id);
      const grnData = req.body;
      const updatedGRN = await this.grnService.updateGRN(grnId, grnData);
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.GRN_UPDATED, {
        grn: updatedGRN,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteGRN(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const grnId = parseInt(req.params.id);
      await this.grnService.deleteGRN(grnId);
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.GRN_DELETED);
    } catch (error) {
      next(error);
    }
  }
  async generateGRNNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const grnNumber = await this.grnService.generateGRNNumber();

      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.GRN_NUMBER_CREATED,
        { grnNumber }
      );
    } catch (error) {
      next(error);
    }
  }
  async generateGRNRegisterReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filters = {
        from: req.query.from ? new Date(String(req.query.from)) : undefined,
        to: req.query.to ? new Date(String(req.query.to)) : undefined,
        vendor_id: req.query.vendor_id
          ? Number(req.query.vendor_id)
          : undefined,
        branch_id: req.query.branch_id
          ? Number(req.query.branch_id)
          : undefined,
      };
      await this.grnService.generateReport(filters, res);
    } catch (error) {
      next(error);
    }
  }
}
