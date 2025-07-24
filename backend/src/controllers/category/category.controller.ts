import { ICategoryServices } from "@/services";
import { ICategoryController } from "./category.interface.controller";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "@/utils";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "@/constants";

export class CategoryController implements ICategoryController {
  constructor(private categoryService: ICategoryServices) {}

  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const category = req.body;
      const newCategory = await this.categoryService.createCategoryService(
        category
      );

      successResponse(
        res,
        StatusCodes.CREATED,
        RESPONSE_MESSAGES.CATEGORY_CREATED,
        { newCategory } 
      );
    } catch (error) {
      next(error);
    }
  }
  async fetchAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const categories = await this.categoryService.fetchAllCategories(
        Number(page),
        Number(limit)
      );

      successResponse(
        res,
        StatusCodes.OK,
        RESPONSE_MESSAGES.CATEGORIES_FETCHED,
        {categories}
      );
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const category = await this.categoryService.findByCategoryId(id);

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.CATEGORY_NOT_FOUND,
        });
      }

      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.CATEGORY_FETCHED, {
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const values = req.body;
      const updatedCategory = await this.categoryService.editCategory(
        id,
        values
      );
      if (!updatedCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.CATEGORY_NOT_FOUND,
        });
      }
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.CATEGORY_UPDATED, {
        updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const deletedCount = await this.categoryService.deleteCategory(id);
      if (deletedCount === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.CATEGORY_NOT_FOUND,
        });
      }
      successResponse(res, StatusCodes.OK, RESPONSE_MESSAGES.CATEGORY_DELETED);
    } catch (error) {
      next(error);
    }
  }
}
