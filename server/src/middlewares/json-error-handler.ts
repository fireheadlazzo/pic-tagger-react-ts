import StatusCode from "http-status";
import { Request, Response, NextFunction } from "express";
import { StatusError } from "models/status-error";

export function jsonErrorHandler (err: Error & StatusError, req: Request, res: Response, next: NextFunction) {
  // TODO: Handle axios errors special?
  const response = {
    status: err.status || StatusCode.INTERNAL_SERVER_ERROR,
    message: err.message
  }
  console.error(`[${response.status}]: ${response.message}`);
  res.status(response.status).json({error: response});
  return;
}