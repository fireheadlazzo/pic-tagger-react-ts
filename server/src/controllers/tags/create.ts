import {Request, Response} from "express";
import { statusCodes } from "../../models/constants";
import { Tag } from "../../models/objs/tag";
import { saveTag } from "../../services/sql";

export function createTag(req: Request, res: Response) {
  console.log(`Creating new tag`)
  
  const item = new Tag(req.body);

  return saveTag(item)
  .then(value => {
    return res.status(statusCodes.CREATED).send(value);
  });
}
