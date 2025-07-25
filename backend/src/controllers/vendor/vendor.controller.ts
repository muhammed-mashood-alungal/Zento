import { IVendorService } from "@/services";
import { IVendorController } from "./vendor.interface.controller";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "@/utils";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "@/constants";

export class VendorController implements IVendorController {
  constructor(private vendorService: IVendorService) {}

  async createVendor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vendorData = req.body;
      const vendor = await this.vendorService.createVendor(vendorData);
      successResponse(
        res,
        StatusCodes.CREATED,
        RESPONSE_MESSAGES.VENDOR_CREATED,
        { vendor }
      );
    } catch (error) {
      next(error);
    }
  }
  async fetchAllVendors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vendors = await this.vendorService.fetchAllVendors();
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.VENDORS_FETCHED,
        {vendors}
      );
    } catch (error) {
      next(error);
    }
  }
  async findByVendorId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vendorId = parseInt(req.params.id);
      const vendor = await this.vendorService.findByVendorId(vendorId);
      if (!vendor) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.VENDOR_NOT_FOUND,
        });
        return;
      }
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.VENDOR_FETCHED, {
        vendor,
      });
    } catch (error) {
      next(error);
    }
  }

  async editVendor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vendorId = parseInt(req.params.id);
      const vendorData = req.body;
      const updatedVendor = await this.vendorService.editVendor(
        vendorId,
        vendorData
      );
      if (!updatedVendor) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.VENDOR_NOT_FOUND,
        });
        return;
      }
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.VENDOR_UPDATED, {
        updatedVendor,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteVendor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vendorId = parseInt(req.params.id);
      const deleted = await this.vendorService.deleteVendor(vendorId);
      if (!deleted) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.VENDOR_NOT_FOUND,
        });
        return;
      }

      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.VENDOR_DELETED, {
        deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
