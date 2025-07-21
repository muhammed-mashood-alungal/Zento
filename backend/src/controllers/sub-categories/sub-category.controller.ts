import { RESPONSE_MESSAGES } from "@/constants";
import { ISubCategoryService } from "@/services";
import { successResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class SubCategoryController {
  constructor(private subCategoryService: ISubCategoryService) {}

  async createSubCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { categoryDetails } = req.body;

      const subCategory = await this.subCategoryService.createSubCategory(
        categoryDetails
      );
      successResponse(
        res,
        StatusCodes.CREATED,
        RESPONSE_MESSAGES.SUB_CATEGORY_CREATED,
        { subCategory }
      );
    } catch (error) {
      next(error);
    }
  }
  async fetchAllSubCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { category_id } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const subCategories =
        await this.subCategoryService.fetchAllSubCategoriesofCategory(
          Number(category_id),
          Number(page),
          Number(limit)
        );

      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.SUB_CATEGORIES_FETCHED,
        subCategories
      );
    } catch (error) {
      next(error);
    }
  }
  async findBySubCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const subCategory = await this.subCategoryService.getSubCategoryById(
        Number(id)
      );

      if (!subCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.SUB_CATEGORY_NOT_FOUND,
        });
      }

      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.SUB_CATEGORY_FETCHED,
        subCategory
      );
    } catch (error) {
      next(error);
    }
  }
  async editSubCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const subCategoryDetails = req.body;

      const updatedSubCategory =
        await this.subCategoryService.updateSubCategory(
          Number(id),
          subCategoryDetails
        );

      if (!updatedSubCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.SUB_CATEGORY_NOT_FOUND,
        });
      }

      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.SUB_CATEGORY_UPDATED,
        updatedSubCategory
      );
    } catch (error) {
      next(error);
    }
  }
  async deleteSubCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;

      const deletedCount = await this.subCategoryService.deleteSubCategory(
        Number(id)
      );

      if (deletedCount === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.SUB_CATEGORY_NOT_FOUND,
        });
      }

      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.SUB_CATEGORY_DELETED
      );
    } catch (error) {
      next(error);
    }
  }
}
