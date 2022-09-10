import sharp from "sharp";
// import StatusCode from "http-status";
import { Request, Response, NextFunction } from "express";
import { UploadRequest } from "models/interfaces/upload-request";

/**
 *
 * getMissingKeys
 */
export function processImage(
  req: Request & UploadRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  // const { file } = req;
  return sharp({
    create: {
      width: 300,
      height: 200,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 0.5 }
    }
  })
    .png()
    .toBuffer()
    .then((result: any) => {
      return;
    })
}
