import config from "config";
import path from "path";
import Multer from "multer";
import StatusCode from "http-status";
import { StatusError } from "models/status-error";
import { NextFunction, Request, Response } from "express";
import { Bucket, Storage } from "@google-cloud/storage";
import { CloudStorageFileError, UploadRequest } from "models/interfaces/upload-request";
import { validFileExtensions } from "models/constants";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
  keyFilename: path.join(__dirname, config.get("STORAGE_CREDENTIALS")),
  projectId: config.get("PROJECT_NAME")
});

export function sendImageToGCS(
  req: Request & UploadRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.file) {
    console.error("sendImageToGCS - No file on upload request")
    return next();
  }

  const bucket: Bucket = storage.bucket(config.get("IMAGE_BUCKET"));
  const fileExt = path.extname(req.file.originalname);
  const filePath = `${uuidv4()}${fileExt}`;

  const file = bucket.file(filePath);

  const stream = file.createWriteStream({
    metadata: { contentType: req.file.mimetype }
  });

  const onSreamError = (err: CloudStorageFileError) => {
    console.error(err.message);
    req.file!.cloudStorageError = err;
    next(err);
  }
  const onSreamFinish = () => {
    console.log("Upload complete");
    req.file!.filename = filePath;
    file.makePublic()
      .then(() => {
        next();
      })
      .catch(next);
  }

  stream.on("error", onSreamError);
  stream.on("finish", onSreamFinish);
  stream.end(req.file.buffer);
}

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    // limit file size to 10MiB for now
    fileSize: 10 * 1048576
  },
  fileFilter : function (req, file, callback) {
    // stop files if they do not have a supported file extension
    const ext = path.extname(file.originalname).slice(1);
    console.log(`ext of [${file.originalname}] = [${ext}]`);
    if (validFileExtensions.indexOf(ext) <= -1) {
      const err = new StatusError("File type is not currently supported");
      err.status = StatusCode.UNPROCESSABLE_ENTITY;
      return callback(err);
    }
    callback(null, true);
  }
});