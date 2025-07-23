import { NextFunction, Request, Response } from "express";

export interface IVendorController {
  createVendor(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchAllVendors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  findByVendorId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  editVendor(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteVendor(req: Request, res: Response, next: NextFunction): Promise<void>;
}
