import { RESPONSE_MESSAGES } from "@/constants";
import { IBranchService } from "@/services";
import { successResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IBranchController } from "./branch.interface.controller";

export class BranchController implements IBranchController {
  constructor(private branchServices: IBranchService) {}

  async findByBranchId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = parseInt(req.params.id);
      const branch = await this.branchServices.getBranchById(branchId);
      if (!branch) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.BRANCH_NOT_FOUND,
        });
      }
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.BRANCH_CREATED, {
        branch,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBranches(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const branches = await this.branchServices.getAllBranches(
        Number(page),
        Number(limit)
      );
      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.BRANCHES_FETCHED,
        branches
      );
    } catch (error) {
      next(error);
    }
  }
  async createBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchData = req.body;
      const newBranch = await this.branchServices.createBranch(branchData);
      successResponse(
        res,
        StatusCodes.CREATED,
        RESPONSE_MESSAGES.BRANCH_CREATED,
        { newBranch } 
      );
    } catch (error) {
      next(error);
    }
  }
  async updateBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = parseInt(req.params.id);
      const branchData = req.body;
      const updatedBranch = await this.branchServices.updateBranch(
        branchId,
        branchData
      );
      if (!updatedBranch) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.BRANCH_NOT_FOUND,
        });
      }
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.BRANCH_UPDATED, {
        updatedBranch,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = parseInt(req.params.id);
      await this.branchServices.deleteBranch(branchId);
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.BRANCH_DELETED);
    } catch (error) {
      next(error);
    }
  }
}
