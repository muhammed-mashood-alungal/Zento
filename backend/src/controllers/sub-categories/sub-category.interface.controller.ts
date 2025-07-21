import { NextFunction, Request, Response } from "express";

export interface ISubCategoryController {
    createSubCategory(req: Request, res: Response, next: NextFunction): Promise<any>;
    fetchAllSubCategories(req: Request, res: Response, next: NextFunction): Promise<any>;
    findBySubCategoryId(req: Request, res: Response, next: NextFunction): Promise<any>;
    editSubCategory(req: Request, res: Response, next: NextFunction): Promise<any>;
    deleteSubCategory(req: Request, res: Response, next: NextFunction): Promise<any>;
}