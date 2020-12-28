import {Request, Response} from "express";
import { UploadRequest } from "../models/upload-request";
import { saveImage } from "../services/sql";

export function createImage(req: Request & UploadRequest, res: Response) {
  console.log(`Creating new image for file [${req.file.bucket}/${req.file.path}]`)

  const imageTemp = {
    url: req.file.path,
    tags: [],
    details: {
      metadata: {
          height: 0,
          width: 0,
      },
      uploadInfo: {
          originalName: req.file.originalname,
          bucket: req.file.bucket,
          fileName: req.file.path,
      }
    },
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    created_by: "admin",
    updated_by: "admin"
  }

  return saveImage(imageTemp)
  .then(value => {
    return res.send(value);
  });
}
