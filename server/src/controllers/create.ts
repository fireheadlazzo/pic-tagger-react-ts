import {Request, Response} from "express";

export function createImage(req: Request, res: Response) {
  console.log("got here")
  return res.send("POST /");
}
