import StatusCode from "http-status";
import { Request, Response, NextFunction } from "express";
import { UploadRequest } from "models/interfaces/upload-request";
import { Image } from "models/objs/image";
import * as sql from "services/sql";
import config from "config";

export function createImage(
  req: Request & UploadRequest,
  res: Response,
  next: NextFunction
) {
  console.log(
    `Creating new image for file [${config.get("IMAGE_BUCKET")}/${req.file?.filename}]`
  );
  const { file } = req;
  if (!file) {
    const error = new Error("Cloud Storage keys not found on file");
    return next(error);
  }

  const imageData = {
    details: {
      metadata: {
        height: 0,
        width: 0,
        originalName: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
      },
    }
  };
  const item = new Image(imageData, file);

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
