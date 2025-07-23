import { RESPONSE_MESSAGES } from "@/constants";
import { HttpError } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { success } from "zod";

export const errorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  console.error(err);

  res.status(statusCode).json({success : false , error: message });
};
