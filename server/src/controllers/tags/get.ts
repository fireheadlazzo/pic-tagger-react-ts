import { Request, Response, NextFunction } from "express";
import * as sql from "services/sql";
import { Tag } from "models/objs/tag";
import { StatusError } from "models/status-error";

export function getTag(req: Request<{id: string}>, res: Response, next: NextFunction) {
  console.log(`Getting tag [${req.params.id}]`);
  if (!req.params.id){
    const error = new Error("getTag - No id to GET");
    return next(error);
  }

  return sql.getTagById(Number(req.params.id))
  .then((value: Tag) => {
    console.log(`Got tag [${value.id}]`);
    return res.send(value);
  })
  .catch((err: StatusError) => {
    if (err.status) {
      return res.status(err.status).send(err.message);
    }
    return next(err);
  });
}
