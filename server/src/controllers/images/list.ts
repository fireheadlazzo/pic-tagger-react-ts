import { Request, Response, NextFunction } from "express";
import * as sql from "services/sql";
import { Image } from "models/objs/image";
import { StatusError } from "models/status-error";
import { QueryOptions } from "models/objs/query-options";

export function listImages(req: Request, res: Response, next: NextFunction) {
  const options = new QueryOptions(req.query);
  console.log(`Listing images with options [${options.toString()}]`);
  // TODO: add options for filtering by tags

  return sql.listImages(options)
  .then((values: Image[]) => {
    console.log(`Got [${values.length}] images`);
    return res.send(values);
  })
  .catch((err: StatusError) => {
    if (err.status) {
      return res.status(err.status).send(err.message);
    }
    return next(err);
  });
}
