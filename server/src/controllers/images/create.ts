import StatusCode from "http-status";
import { Request, Response, NextFunction } from "express";
import { UploadRequest } from "models/interfaces/upload-request";
import { Image } from "models/objs/image";
import * as sql from "services/sql";

export function createImage(
  req: Request & UploadRequest,
  res: Response,
  next: NextFunction
) {
  console.log(
    `Creating new image for file [${req.file.bucket}/${req.file.path}]`
  );
  const { file } = req;
  if (!file.originalname || !file.bucket || !file.path) {
    const error = new Error("Cloud Storage keys not found on file");
    return next(error);
  }

  const item = new Image(file);
  // images start with no tags
  item.tags = [];
  item.filename = file.path;
  item.bucket = file.bucket;
  item.details = {
    metadata: {
      height: 0,
      width: 0,
    },
    uploadInfo: {
      originalName: file.originalname,
    },
  };

  return sql
    .saveImage(item)
    .then((value) => {
      return res.status(StatusCode.CREATED).send(value);
    })
    .catch((err: Error) => {
      console.error(`createImage ERROR: ${err}`);
      return next(err);
    });
}
