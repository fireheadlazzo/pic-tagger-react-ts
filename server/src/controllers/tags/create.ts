import {Request, Response} from "express";
import { Tag } from "../../models/objs/tag";
import { saveTag } from "../../services/sql";

export function createTag(req: Request, res: Response) {
  console.log(`Creating new tag`)
  
  const item = new Tag(req.body);

  console.log("req", req.params);
  console.log("req", req.path);
  console.log("req", req.query);
  console.log("req", req.body);

  return saveTag(item)
  .then(value => {
    return res.send(value);
  });
}
