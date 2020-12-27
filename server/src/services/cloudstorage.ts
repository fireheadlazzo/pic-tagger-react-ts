import {NextFunction, Request, Response} from "express";
import {Bucket, Storage, GetBucketsResponse} from "@google-cloud/storage";
import config from '../config';
import {UploadRequest} from "../models/upload-request";

const storage = new Storage();

export function sendImageToGCS(req: Request & UploadRequest, res: Response, next: NextFunction) {
  if (!req.file) {
    console.log(req)
    return next();
  }
  console.log(Object.keys(req.file));
  const bucket: Bucket = storage.bucket(config.get("IMAGE_BUCKET"));
  console.log(bucket.name);
  return next();
}

export function listBuckets(req: Request, res: Response, next: NextFunction) {
  return storage.getBuckets()
  .then((buckets: GetBucketsResponse) => {
    buckets[0].forEach((bucket: Bucket, index: number) => {
      console.log(`[Bucket ${index}]`, bucket.name);
    });
    console.log("done");
    return next();
  }).catch((err: Error) => {
    console.error(err.name);
    console.error(err.message);
  });
}
