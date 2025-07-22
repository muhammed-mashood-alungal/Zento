import { NextFunction, Request, Response } from "express";

export interface IManufacturerController {
  createManufacturer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  getManufacturerById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateManufacturer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteManufacturer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getAllManufacturers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  changeManufacturerStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
