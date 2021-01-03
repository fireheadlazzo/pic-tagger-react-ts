import {Request, Response} from "express";
import { getImageById } from "../../services/sql";
import { Image } from "../../models/objs/image";
import { StatusError } from "../../models/status-error";

export function getImage(req: Request<{id: string}>, res: Response) {
  console.log(`Getting image [${req.params.id}]`);
  if (!req.params.id){
    const error = new Error("getImage - No id to GET");
    throw(error);
  }

  return getImageById(Number(req.params.id))
  .then((value: Image) => {
    console.log(`Got image [${value.id}]`);
    return res.send(value);
  })
  .catch((err: StatusError) => {
    if (err.status) {
      return res.status(err.status).send(err.message);
    }
    throw err;
  });
}
