import express from "express";
import * as storage from "../services/cloudstorage";
import morgan from "morgan";
import { createImage, getImage } from "../controllers/images";
import { createTag } from "../controllers/tags";
import * as middleware from "../middlewares";
import * as constants from "../models/constants";

class Router {
  constructor() {
    this.app = express.Router();
    this.app.use(express.json());

    this.app.use(morgan("dev"));

    // Assign the following routes
    console.log("Defining routes");
    /**
     * Images
     */
    this.app.get(`/${constants.imagesRoute}/:id`, getImage);

    this.app.post(`/${constants.imagesRoute}/?`,
      storage.multer.single("file"),
      middleware.checkKeys.images.POST,
      storage.sendImageToGCS,
      createImage
    );
    /**
     * Tags
     */
    this.app.post(`/${constants.tagsRoute}/?`,
      middleware.checkKeys.tags.POST,
      createTag
    );
    this.app.get(`/${constants.tagsRoute}/?`,
      middleware.checkKeys.tags.GET
    );

    this.app.use(middleware.jsonErrorHandler);
    this.app.use((req, res, next) => {
      res.set("Content-Type", "application/json");
      next();
    });
  }

  public app: express.Router;
}

export default new Router;