import {NextFunction, Request, Response} from "express";
import {Bucket, Storage, GetBucketsResponse} from "@google-cloud/storage";
import config from "../config";
import {UploadRequest} from "../models/interfaces/upload-request";
import path from "path";
import Multer from "multer";
import {v4 as uuidv4} from "uuid";

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
    console.error("No file on upload request!")
    return next();
  }

  const bucket: Bucket = storage.bucket(config.get("IMAGE_BUCKET"));
  const fileExt = path.extname(req.file.originalname);
  const filePath = `${uuidv4()}${fileExt}`;

  const file = bucket.file(filePath);

  const stream = file.createWriteStream({
    metadata: { contentType: req.file.mimetype }
  });

  const onSreamError = (err: Error) => {
    console.error(err.message);
    req.file.cloudStorageError = err,
    next(err);
  }
  const onSreamFinish = () => {
    console.log("Upload complete");
    req.file.bucket = config.get("IMAGE_BUCKET");
    req.file.path = filePath;
    next();
  }

  stream.on("error", onSreamError);
  stream.on("finish", onSreamFinish);
  stream.end(req.file.buffer);
}

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 40 * 1048576
  }
});