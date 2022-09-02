import { Request, Response, NextFunction } from "express";
import { ImageRequest } from "models/interfaces/image-request";
import { Image } from "models/objs/image";
import { getImageById } from "services/sql";

export function loadImageById(req: Request & ImageRequest, res: Response, next: NextFunction) {
    if (!req.params.id){
        const error = new Error("loadImageById - No id on params");
        return next(error);
    }
    const id = Number(req.params.id);
    return getImageById(id)
    .then((result: Image) => {
        req.image = result;
        next();
    })
    .catch(err => {
        next(err);
    });
}