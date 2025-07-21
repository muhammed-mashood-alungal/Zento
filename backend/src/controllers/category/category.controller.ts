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
      const category = req.body.category;
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
}
