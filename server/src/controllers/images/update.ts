import { Request, Response, NextFunction } from "express";
import { Image } from "models/objs/image";
import { ImageRequest } from "models/interfaces/image-request";
import { StatusError } from "models/status-error";
import * as sql from "services/sql";

export function updateImage(req: Request<{id: string}> & ImageRequest, res: Response, next: NextFunction) {
  if (!req.params.id){
    const error = new Error("updateImage - No id on params");
    return next(error);
  }
  if (!req.image){
    const error = new Error("updateImage - No image on req");
    return next(error);
  }
  console.log(`Updating image [${req.params.id}] with request [${req.body}]`);

  const newImage = req.image.toUpdateObj(req.body);

  return sql.updateImageById(newImage)
  .then((value: Image) => {
    console.log(`Updated image [${value.id}]`, value);
    return res.send(value);
  })
  .catch((err: StatusError) => {
    if (err.status) {
      return res.status(err.status).send(err.message);
    }
    return next(err);
  });
}
