import { NextFunction, Request, Response } from "express";

export interface ICategoryController {
    createCategory(req : Request, res : Response, next : NextFunction) : Promise<any>
    fetchAllCategories(req : Request, res : Response, next : NextFunction) : Promise<any>
    findByCategoryId(req : Request, res : Response, next : NextFunction) : Promise<any>
    editCategory(req : Request, res : Response, next : NextFunction) : Promise<any>
    deleteCategory(req : Request, res : Response, next : NextFunction) : Promise<any>
}