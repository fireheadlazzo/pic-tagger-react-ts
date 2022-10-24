import StatusCode from "http-status";
import { Request, Response, NextFunction } from "express";
import { UploadRequest } from "models/interfaces/upload-request";
import { Image } from "models/objs/image";
import * as sql from "services/sql";
import config from "config";
import sharp from "sharp";

const BUCKET = "pic-tagger-v2-images";

export async function createImage(
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

  const imageMetadata = await sharp(file.buffer)
    .metadata()
    .then(result => {
      return result;
    });

  const imageData = {
    details: {
      metadata: {
        height: imageMetadata.height,
        width: imageMetadata.width,
        originalName: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
      },
      lastSourceAttempt: undefined,
    },
    url: `https://storage.googleapis.com/${BUCKET}/${file.filename}`
  };
  const item = new Image(imageData);

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
