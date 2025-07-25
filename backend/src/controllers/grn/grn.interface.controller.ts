import { NextFunction, Request, Response } from "express";

export interface IGRNController {
    findGRNById(req :Request, res: Response, next: NextFunction): Promise<void>;
    fetchAllGRNs(req: Request, res: Response, next: NextFunction): Promise<void>;
    createGRN(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateGRN(req: Request, res: Response, next: NextFunction): Promise<void>
    deleteGRN(req: Request, res: Response, next: NextFunction): Promise<void>;
    generateGRNNumber(req: Request, res: Response, next: NextFunction): Promise<void>;
    generateGRNRegisterReport(req: Request, res: Response, next: NextFunction): Promise<void>;
}