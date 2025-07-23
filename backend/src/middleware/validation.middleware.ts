import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { treeifyError, ZodType } from "zod";

export const validate =
  (schema: ZodType<any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      const formattedError = treeifyError(validation.error);
      res.status(StatusCodes.BAD_REQUEST).json({ error: formattedError });
      return;
    }

    req.body = validation.data;
    next();
  };
