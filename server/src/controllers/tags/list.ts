import { Request, Response, NextFunction } from "express";
import { Tag } from "models/objs/tag";
import { StatusError } from "models/status-error";
import { QueryOptions } from "models/objs/query-options";
import * as sql from "services/sql";

export function listTags(req: Request, res: Response, next: NextFunction) {
  const options = new QueryOptions(req.query);
  console.log(`Listing tags with options [${options.toString()}]`);
  // TODO: add options for filtering by tag type?

  return sql.listTags(options)
  .then((values: Tag[]) => {
    console.log(`Got [${values.length}] tags`);
    return res.send(values);
  })
  .catch((err: StatusError) => {
    if (err.status) {
      return res.status(err.status).send(err.message);
    }
    return next(err);
  });
}
