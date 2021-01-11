import { Request, Response, NextFunction } from "express";
import { UploadRequest } from "../models/interfaces/upload-request";
import { Image } from "../models/objs/image";
import { Tag } from "../models/objs/tag";
import { StatusError } from "../models/status-error";
import { statusCodes } from "../models/constants";

/**
 * getMissingKeys
 * @param req the generic request object. may or may not have a file on it
 * @param keys an array of strings that should be on req.body. If "file" is included, it should be on req
 * @returns all of the required keys that were not found
 */
function getMissingKeys(req: Request & UploadRequest, keys: string[]): string[] {
  const missing: string[] = [];

  keys.forEach((key:string) => {
    if (key === "file") {
      if (req[key] === undefined){
        missing.push(key);
      }
    } else if (!req.body[key]) {
      missing.push(key);
    }
  });
  return missing;
}

export const checkKeys = {
  images: {
    POST: (req: Request & UploadRequest, res: Response, next: NextFunction) => {
      const missing = getMissingKeys(req, Image.requiredKeysPost);

      if (missing.length !== 0) {
        console.error("imagePOST failed required keys");
        const error = new StatusError(`missing keys [${missing.join()}]`);
        error.status = statusCodes.UNPROCESSABLE_ENTITY;
        return next(error);
      }
      next();
    },
  },

  tags: {
    POST: (req: Request, res: Response, next: NextFunction) => {
      const missing = getMissingKeys(req, Tag.requiredKeysPost);
  
      if (missing.length !== 0) {
        console.error("tagPOST failed required keys");
        const error = new StatusError(`missing keys [${missing.join()}]`);
        error.status = statusCodes.UNPROCESSABLE_ENTITY;
        return next(error);
      }
      next();
    },
    GET: (req: Request, res: Response, next: NextFunction) => {
      res.set("Content-Type", "application/json");
      const err = new StatusError("Oops");
      err.status = 404;
      return next(err);
    },
  },
}
