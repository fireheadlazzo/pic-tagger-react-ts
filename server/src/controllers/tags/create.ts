import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../../models/constants";
import { Tag } from "../../models/objs/tag";
import { saveTag } from "../../services/sql";

export function createTag(req: Request, res: Response, next: NextFunction) {
  console.log(`Creating new tag`)
  
  const item = new Tag(req.body);
  item.images = req.body.images ? JSON.parse(req.body.images) : [];

  return saveTag(item)
  .then(value => {
    return res.status(statusCodes.CREATED).send(value);
  })
  .catch((err: Error) => {
    console.error(`createTag ERROR: ${err}`);
    return next(err);
  });
}
