import { IManufacturerService } from "@/services";
import { IManufacturerController } from "./manufacturer.interface.controller";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "@/constants";
import { successResponse } from "@/utils";

export class ManufacturerController implements IManufacturerController {
  constructor(private manufacturerService: IManufacturerService) {}

  async createManufacturer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const manufacturerData = req.body;
      console.log(manufacturerData)
      const newManufacturer = await this.manufacturerService.createManufacturer(
        manufacturerData
      );
      if (!newManufacturer) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.MANUFACTURER_CREATION_FAILED,
        });
        return;
      }
      successResponse(
        res,
        StatusCodes.CREATED,
        RESPONSE_MESSAGES.MANUFACTURER_CREATED, 
        { manufacturer: newManufacturer }
      );
    } catch (error) {
      next(error);
    }
  }
  async getManufacturerById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const manufacturerId = parseInt(req.params.id);
      const manufacturer = await this.manufacturerService.getManufacturerById(
        manufacturerId
      );
      if (!manufacturer) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.MANUFACTURER_NOT_FOUND,
        });
        return;
      }
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.MANUFACTURER_FETCHED,
        { manufacturer }
      );
    } catch (error) {
      next(error);
    }
  }
  async updateManufacturer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const manufacturerId = parseInt(req.params.id);
      const updates = req.body;
      const updatedManufacturer =
        await this.manufacturerService.updateManufacturer(
          manufacturerId,
          updates
        );
      if (!updatedManufacturer) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.MANUFACTURER_NOT_FOUND,
        });
        return;
      }
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.MANUFACTURER_UPDATED,
        { updatedManufacturer }
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteManufacturer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const manufacturerId = parseInt(req.params.id);
      console.log('DELETING+++++++++++++++++++++++++++++++++++++++++=',manufacturerId)
      const deleted = await this.manufacturerService.deleteManufacturer(
        manufacturerId
      );
      if (!deleted) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.MANUFACTURER_NOT_FOUND,
        });
        return;
      }
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.MANUFACTURER_DELETED,
        { deleted }
      );
    } catch (error) {
      next(error);
    }
  }
  async getAllManufacturers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const manufacturers = await this.manufacturerService.getAllManufacturers();
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.MANUFACTURERS_FETCHED,
        {manufacturers}
      );
    } catch (error) {
      next(error);
    }
  }

  async changeManufacturerStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const manufacturerId = parseInt(req.params.id);
      const { status } = req.body;
      const updatedManufacturer =
        await this.manufacturerService.changeManufacturerStatus(
          manufacturerId,
          status
        );
      if (!updatedManufacturer) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.MANUFACTURER_NOT_FOUND,
        });
        return;
      }
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.MANUFACTURER_STATUS_UPDATED,
        { updatedManufacturer }
      );
    } catch (error) {
      next(error);
    }
  }
}
