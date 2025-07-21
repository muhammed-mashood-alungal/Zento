import { NextFunction, Request, Response } from "express";

export interface IBranchController {
  getAllBranches(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  findByBranchId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  createBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
